const logger = require('./Logger')
const config = require('./config.json')
const LightS = require('./Lights')

module.exports = class PowerOff {

    static lights;

    constructor(lights) {
        PowerOff.lights = lights
    }

    registerEndpoints(app) {
        app.post(`${config.powerOff.apiEndpoint}`, async (req, res) => {
            await this.trigger()
            res.sendStatus(200)
        })
    }

    async trigger() {
        logger.turnOff('triggered')
        PowerOff.lights && await PowerOff.lights.turnLightsOff()
    }
}