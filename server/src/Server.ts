import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './services/Config.js'

import Lights from './services/Lights.js'
import Climate from './services/Climate.js'
import Logger from './util/Logger.js'
import Admin from './services/Admin.js';

import ServiceSingletonContainer from './util/ServiceSingletonContainer.js';
import {Service} from './services/Service';

export function generateEndpointUrl(section: string) {
    // @ts-ignore
    return config.server.apiBaseUrl + config[section].apiEndpoint
}

function start() {
    const logger = new Logger('server')
    logger.log('starting up')

    logger.log('creating express instance')
    const app = express()
    app.use(bodyParser.text())
    app.use(cors())

    logger.log('creating services')
    ServiceSingletonContainer.registerService(new Lights());
    ServiceSingletonContainer.registerService(new Admin());
    ServiceSingletonContainer.registerService(new Climate());

    logger.log('registering service endpoints')
    ServiceSingletonContainer.getAllServices().forEach((service: Service) => service.registerEndpoints(app));

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
