const logger = require('./Logger')
const config = require('./config.json')
const LightS = require('./Lights')

module.exports = class TurnOff {
    registerEndpoints(app) {
        app.post(`${config.turnOff.apiEndpoint}`, async (req, res) => {
            await this.trigger()
            res.sendStatus(200)
        })
    }

    async trigger() {
        logger.turnOff('triggered')
        await (new LightS()).turnLightsOff();
    }
}