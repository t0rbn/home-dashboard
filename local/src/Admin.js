import Logger from './Logger.js'
import config from './Config.js'

export default class Admin {

    constructor() {
        this.logger = new Logger('admin')
    }

    registerEndpoints(app) {
        app.get(config.admin.apiEndpoint + '/kill', async (req, res) => {
            res.sendStatus(200)
            this.kill()
        })
    }

    kill() {
        this.logger.alert('will kill process')
        process.exit(0)
    }

}