import Logger from './Logger.js'
import config from './Config.js'
import {Service} from './Service'
import {Application, Request, Response} from 'express'

export default class Admin implements Service {

    private logger = new Logger('admin')

    registerEndpoints(app: Application): void {
        app.get(config.admin.apiEndpoint + '/kill', async (_req: Request, res: Response) => {
            res.sendStatus(200)
            this.kill()
        })
    }

    kill(): void {
        this.logger.alert('will kill process')
        process.exit(0)
    }

}
