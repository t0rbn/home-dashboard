import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './Config.js'

import Lights from './Lights.js'
import Climate from './Climate.js'
import Logger from './Logger.js'
import Admin from './Admin.js';

export function generateEndpointUrl(section: string) {
    // @ts-ignore
    return config.server.apiBaseUrl + config[section].apiEndpoint
}

function start() {
    const logger = new Logger('server')
    logger.log('starting up')

    const app = express()
    app.use(bodyParser.text())
    app.use(cors())

    new Lights().registerEndpoints(app)
    new Climate().registerEndpoints(app)
    new Admin().registerEndpoints(app)

    app._router.stack.forEach((layer: any) => {
        if (layer.route?.path) {
            logger.log(`registered path ${layer.route.path}`)
        }
    })

    app.get(config.server.apiBaseUrl, async (_req: Request, _res: Response) => {
        _res.send(app._router.stack.map((layer: any) => layer.route?.path).filter(Boolean))
    })

    app.use(express.static('client'))
    app.listen(config.server.port, () => logger.log(`started on port ${config.server.port}`))
}

start();
