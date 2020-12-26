const fs = require('fs')
const Tradfri = require('ikea-tradfri')
const logger = require('./Logger')
let config = require('./config.json')

module.exports = class Lights {

    connection = null
    scenes = []
    lastScenesLoadTimestamp = 0

    constructor() {
        logger.tradfri('connecting to gateway')
        let credsFile
        try {
            credsFile = require('./tradfri_credentials.json')
        } catch (e) {
            logger.tradfri('no credentials file found, will create')
        }

        if (!credsFile || !credsFile.identity || !credsFile.psk) {
            logger.tradfri('No Credentials found, generating...')
            this.connection = new Tradfri(config.tradfri.hub, config.tradfri.securityId)
            this.connection.connect().then(connectionResponse => {
                const credentialsObj = {
                    identity: connectionResponse.identity,
                    psk: connectionResponse.psk
                }
                logger.tradfri('Writing credentials file')
                fs.writeFile('./src/tradfri_credentials.json', JSON.stringify(credentialsObj), () => {
                })
            })
        } else {
            logger.tradfri('connecting with stored identity + psk')
            this.connection = new Tradfri(config.tradfri.hub, credsFile)
            this.connection.connect()
        }
    }

    registerEndpoints(app) {
        app.get(config.lights.apiEndpoint, async (req, res) => {
            res.send(await this.getAllLights())
        })

        app.get(config.lights.apiEndpoint + '/scenes', async (req, res) => {
            res.send(this.getAllScenes())
        })

        app.post(`${config.lights.apiEndpoint}/scenes`, async (req, res) => {
            await this.setScene(req.body)
            res.sendStatus(200)
        })
    }

    getSceneSuperGroup() {
        return this.connection.group('SuperGroup')
    }

    getAllScenes() {
        if (!this.scenes || this.lastScenesLoadTimestamp < Date.now() - config.lights.refreshThresholdMins * 60000) {
            logger.tradfri('fetching scenes from gateway')
            this.scenes = this.getSceneSuperGroup().scenes
            this.lastScenesLoadTimestamp = Date.now()
            logger.tradfri(`retrieved new scenes: ${this.scenes}`)
        }
        return this.scenes
    }

    async setScene(scene) {
        logger.tradfri('applying scene ' + scene)
        await this.getSceneSuperGroup().setScene(scene)
    }

    getAllLights() {
        return this.connection.devices
            .filter(d => d.type === 'Bulb')
            .filter(d => d.alive)
            .map(d => {
                return {name: d.name, brightness: d.isOn ? d.brightness : 0}
            })
    }
}
