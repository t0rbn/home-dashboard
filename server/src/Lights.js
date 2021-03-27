import * as fs from 'fs'
import config from './Config.js'
import {AccessoryTypes, discoverGateway, TradfriClient} from 'node-tradfri-client'
import Logger from './Logger.js'

export default class Lights {
    connection = null
    scenes = []
    bulbs = []
    superGroup = null

    constructor() {
        this.logger = new Logger('lights')
        this.initConnection().then(() => this.initDataAndListeners()).catch()
    }

    async initConnection() {
        this.logger.log('discovering tradfri gateway')
        const gateway = await discoverGateway()

        this.logger.log('got gateway ' + gateway.name)
        this.connection = new TradfriClient(gateway.name)

        let identity
        let psk
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
            fs.writeFile(config.tradfri.credentialsFileLocation, JSON.stringify({identity, psk}), () => this.logger.log('wrote new credentials'))
        }
        await this.connection.connect(identity, psk)
    }

    async initDataAndListeners() {
        const deleteScene = (id) => {
            this.scenes = this.scenes.filter(s => s.id !== id)
        }

        const addOrUpdateScene = (scene) => {
            this.logger.log(`retrieved information for scene ${scene.name}`)
            deleteScene(scene.instanceId)
            this.scenes.push({name: scene.name, id: scene.instanceId})
        }

        const deleteBulb = (id) => {
            this.bulbs = this.bulbs.filter(b => b.instanceId !== id)
        }

        const addOrUpdateBulb = (device) => {
            deleteBulb(device.instanceId)
            if (device.type === AccessoryTypes.lightbulb) {
                this.logger.log(`retrieved information for lightbulb ${device.name}`)
                this.bulbs.push(device)
            }
        }

        this.connection
            .on('scene updated', (group, scene) => addOrUpdateScene(scene))
            .on('scene removed', (group, instanceId) => deleteScene(instanceId))
            .on('group updated', (group) => {
                    if (group.name === 'SuperGroup') {
                        this.superGroup = group
                    }
                }
            )
            .observeGroupsAndScenes()
            .catch()

        this.connection
            .on('device updated', (device) => addOrUpdateBulb(device))
            .on('device removed', (instanceId) => deleteBulb(instanceId))
            .observeDevices()
            .catch()
    }

    registerEndpoints(app) {
        app.get(config.tradfri.apiEndpoint + '/bulbs', async (req, res) => {
            res.send(this.getBulbs())
        })

        app.post(`${config.tradfri.apiEndpoint}/bulbs/:id/brightness`, async (req, res) => {
            try {
                await this.setBulbBrightness(Number.parseInt(req.params.id, 10), Number.parseFloat(req.body))
                res.sendStatus(200)
            } catch (e) {
                res.sendStatus(500)
            }
        })

        app.post(`${config.tradfri.apiEndpoint}/bulbs/:id/temperature`, async (req, res) => {
            try {
                await this.setBulbTemperature(Number.parseInt(req.params.id, 10), Number.parseFloat(req.body))
                res.sendStatus(200)
            } catch (e) {
                res.sendStatus(500)
            }
        })

        app.post(`${config.tradfri.apiEndpoint}/bulbs/:id/color`, async (req, res) => {
            try {
                await this.setBulbColor(Number.parseInt(req.params.id, 10), req.body)
                res.sendStatus(200)
            } catch (e) {
                res.sendStatus(500)
            }
        })


        app.get(config.tradfri.apiEndpoint + '/scenes', async (req, res) => {
            res.send(this.scenes)
        })

        app.post(`${config.tradfri.apiEndpoint}/scenes`, async (req, res) => {
            try {
                await this.setScene(Number.parseInt(req.body, 10))
                res.sendStatus(200)
            } catch (e) {
                res.sendStatus(500)
            }
        })
    }

    getBulbs() {
        return this.bulbs.map(bulb => ({
            name: bulb.name,
            id: bulb.instanceId,
            spectrum: bulb.lightList[0].spectrum,
            color: '#' + bulb.lightList[0].color,
            brightness: bulb.lightList[0].onOff ? (bulb.lightList[0].dimmer / 100) : 0
        }))
    }

    async setBulbBrightness(bulbId, brightness) {
        const bulb = this.bulbs.filter(bulb => bulb.instanceId === bulbId)[0]
        if (!bulb) {
            this.logger.alert('cannot set brightness for unknown bulb')
            throw 'unknown lightbulb'
        }

        const newBrightness = Math.max(0, Math.min(100, Math.round(brightness * 100)))
        await this.connection.operateLight(bulb, {
            dimmer: newBrightness,
            onOff: newBrightness > 0
        })
    }

    async setBulbTemperature(bulbId, temp) {
        const bulb = this.bulbs.filter(bulb => bulb.instanceId === bulbId)[0]
        if (!bulb) {
            this.logger.alert('cannot set temperature for unknown bulb')
            throw 'unknown lightbulb'
        }

        const spectrum = bulb.lightList[0].spectrum
        if (spectrum !== 'white') {
            this.logger.alert('temperature not supported by spectrum')
            throw 'temperature operation not supported'
        }

        const newTemp = Math.max(1, Math.min(100, Math.round(temp * 100)))
        await this.connection.operateLight(bulb, {colorTemperature: newTemp})
    }

    async setBulbColor(bulbId, hexColor) {
        const bulb = this.bulbs.filter(bulb => bulb.instanceId === bulbId)[0]
        if (!bulb) {
            this.logger.alert('cannot set temperature for unknown bulb')
            throw 'unknown lightbulb'
        }

        const spectrum = bulb.lightList[0].spectrum
        if (spectrum !== 'rgb') {
            this.logger.alert('color operation not supported by spectrum')
            throw 'color operation not supported'
        }
        await this.connection.operateLight(bulb, {color: hexColor.replace('#', '')})
    }

    async setScene(sceneId) {
        await this.connection.operateGroup(this.superGroup, {sceneId})
    }
}
