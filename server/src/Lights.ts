import * as fs from 'fs'
import config from './Config.js'
import {Accessory, AccessoryTypes, discoverGateway, Group, Scene, Spectrum, TradfriClient} from 'node-tradfri-client'
import Logger from './Logger.js'
import IPSODeviceUsageSorter from './IPSODeviceUsageSorter.js';
import {Service} from './Service'
import {Application, Request, Response} from 'express'

export type BulbResponse = {
    name: string
    id: number
    spectrum?: Spectrum
    color?: string
    brightness?: number
}

export type SceneResponse = {
    name: string,
    id: number
}

export default class Lights implements Service {
    private connection?: TradfriClient
    private scenes: Array<Scene> = []
    private bulbs: Array<Accessory> = []
    private superGroup?: Group
    private logger = new Logger('lights')
    private bulbsUsageSorter = new IPSODeviceUsageSorter<Accessory>();
    private scenesUsageSorter = new IPSODeviceUsageSorter<Scene>();

    constructor() {
        this.initConnection().then(() => this.initDataAndListeners()).catch()
    }

    async initConnection(): Promise<void> {
        this.logger.log('discovering tradfri gateway')
        let gateway
        try {
            gateway = await discoverGateway()
        } catch (e) {
            this.logger.alert('Cannot discover gateway')
            console.log(e)
        }
        if (!gateway) {
            return
        }

        this.logger.log('got gateway ' + gateway.name)
        this.connection = new TradfriClient(gateway.name)

        let identity: string
        let psk: string

        try {
            this.logger.log('reading credentials from file')
            let credsFile = JSON.parse(fs.readFileSync(config.tradfri.credentialsFileLocation, 'utf-8'))
            identity = credsFile.identity
            psk = credsFile.psk
        } catch (e) {
            this.logger.alert('failed to read credentials from file, will reauthenticate')
            const response = await this.connection.authenticate(config.tradfri.securityId)
            identity = response.identity
            psk = response.psk
            fs.writeFile(
                config.tradfri.credentialsFileLocation,
                JSON.stringify({identity, psk}),
                () => this.logger.log(`wrote new credentials to ${config.tradfri.credentialsFileLocation}`)
            )
        }
        await this.connection.connect(identity, psk)
    }

    async initDataAndListeners(): Promise<void> {
        if (!this.connection) {
            return
        }

        const deleteScene = (id: number) => {
            this.scenes = this.scenes.filter(s => s.instanceId !== id)
        }

        const addOrUpdateScene = (scene: Scene) => {
            this.logger.log(`retrieved information for scene ${scene.name}`)
            deleteScene(scene.instanceId)
            this.scenes.push(scene)
        }

        const deleteBulb = (id: number) => {
            this.bulbs = this.bulbs.filter(b => b.instanceId !== id)
        }

        const addOrUpdateBulb = (device: Accessory) => {
            deleteBulb(device.instanceId)
            if (device.type === AccessoryTypes.lightbulb) {
                this.logger.log(`retrieved information for lightbulb ${device.name}`)
                this.bulbs.push(device)
            }
        }

        this.connection
            .on('scene updated', (_group: number, scene: Scene) => addOrUpdateScene(scene))
            .on('scene removed', (_group: number, instanceId: number) => deleteScene(instanceId))
            .on('group updated', (group: Group) => {
                    if (group.name === 'SuperGroup') {
                        this.superGroup = group
                    }
                }
            )
            .observeGroupsAndScenes()
            .catch()

        this.connection
            .on('device updated', (device: Accessory) => addOrUpdateBulb(device))
            .on('device removed', (instanceId: number) => deleteBulb(instanceId))
            .observeDevices()
            .catch()
    }

    registerEndpoints(app: Application): void {
        app.get(config.tradfri.apiEndpoint + '/bulbs', async (_req: Request, res: Response) => {
            res.send(this.getBulbs())
        })

        app.post(`${config.tradfri.apiEndpoint}/bulbs/:id/brightness`, async (req: Request, res: Response) => {
            try {
                const {id} = req.params;
                const instanceId = Number.parseInt(id as string, 10)
                await this.setBulbBrightness(instanceId, Number.parseFloat(req.body))
                this.bulbsUsageSorter.registerUsage(instanceId)
                res.sendStatus(200)
            } catch (e) {
                res.sendStatus(500)
            }
        })

        app.post(`${config.tradfri.apiEndpoint}/bulbs/:id/temperature`, async (req: Request, res: Response) => {
            try {
                const {id} = req.params;
                const instanceId = Number.parseInt(id as string, 10)
                await this.setBulbTemperature(instanceId, Number.parseFloat(req.body))
                this.bulbsUsageSorter.registerUsage(instanceId)
                res.sendStatus(200)
            } catch (e) {
                res.sendStatus(500)
            }
        })

        app.post(`${config.tradfri.apiEndpoint}/bulbs/:id/color`, async (req: Request, res: Response) => {
            try {
                const {id} = req.params;
                const instanceId = Number.parseInt(id as string, 10)
                await this.setBulbColor(instanceId, req.body)
                this.bulbsUsageSorter.registerUsage(instanceId)
                res.sendStatus(200)
            } catch (e) {
                res.sendStatus(500)
            }
        })


        app.get(config.tradfri.apiEndpoint + '/scenes', async (_req: Request, res: Response) => {
            res.send(this.getScenes())
        })

        app.post(`${config.tradfri.apiEndpoint}/scenes`, async (req: Request, res: Response) => {
            try {
                const instanceId = Number.parseInt(req.body, 10)
                await this.setScene(instanceId)
                this.scenesUsageSorter.registerUsage(instanceId);
                res.sendStatus(200)
            } catch (e) {
                res.sendStatus(500)
            }
        })
    }

    getBulbs(): Array<BulbResponse> {
        return this.bulbsUsageSorter.sort(this.bulbs).map((bulb: Accessory) => ({
            name: bulb.name,
            id: bulb.instanceId,
            spectrum: bulb.lightList[0]?.spectrum,
            color: '#' + bulb.lightList[0]?.color,
            brightness: bulb.lightList[0]?.onOff ? (bulb.lightList[0]?.dimmer / 100) : 0
        }))
    }

    async setBulbBrightness(bulbId: number, brightness: number): Promise<void> {
        const bulb = this.bulbs.filter(bulb => bulb.instanceId === bulbId)[0]
        if (!bulb) {
            this.logger.alert('cannot set brightness for unknown bulb')
            throw 'unknown lightbulb'
        }

        const newBrightness = Math.max(0, Math.min(100, Math.round(brightness * 100)))
        await this.connection?.operateLight(bulb, {
            dimmer: newBrightness,
            onOff: newBrightness > 0
        })
    }

    async setBulbTemperature(bulbId: number, temp: number): Promise<void> {
        const bulb = this.bulbs.filter(bulb => bulb.instanceId === bulbId)[0]
        if (!bulb) {
            this.logger.alert('cannot set temperature for unknown bulb')
            throw 'unknown lightbulb'
        }

        const spectrum = bulb.lightList[0]?.spectrum
        if (spectrum !== 'white') {
            this.logger.alert('temperature not supported by spectrum')
            throw 'temperature operation not supported'
        }

        const newTemp = Math.max(1, Math.min(100, Math.round(temp * 100)))
        await this.connection?.operateLight(bulb, {colorTemperature: newTemp})
    }

    async setBulbColor(bulbId: number, hexColor: string): Promise<void> {
        const bulb = this.bulbs.filter(bulb => bulb.instanceId === bulbId)[0]
        if (!bulb) {
            this.logger.alert('cannot set temperature for unknown bulb')
            throw 'unknown lightbulb'
        }

        const spectrum = bulb.lightList[0]?.spectrum
        if (spectrum !== 'rgb') {
            this.logger.alert('color operation not supported by spectrum')
            throw 'color operation not supported'
        }
        await this.connection?.operateLight(bulb, {color: hexColor.replace('#', '')})
    }

    getScenes(): Array<SceneResponse> {
        return this.scenesUsageSorter.sort(this.scenes).map((scene: Scene) => ({name: scene.name, id: scene.instanceId}))
    }

    async setScene(sceneId: number): Promise<void> {
        if (!this.superGroup) {
            return
        }
        await this.connection?.operateGroup(this.superGroup, {sceneId}, true)
    }
}
