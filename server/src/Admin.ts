import {Service} from './Service'
import {Application, Request, Response} from 'express';
import {generateEndpointUrl} from './Server.js';
import Lights from './Lights.js';

export default class Admin implements Service {
    registerEndpoints(app: Application): void {
        app.post(generateEndpointUrl(`admin`) + '/actions/restartSystemD', async (_req: Request, _res: Response) => {
            this.rebootSystemD();
            _res.sendStatus(200)
        })

        app.post(generateEndpointUrl(`admin`) + '/actions/restartTradfriGateway', async (_req: Request, _res: Response) => {
            await this.rebootTradfriGateway();
            _res.sendStatus(200)
        })
    }

    rebootSystemD() {
        process.exit(1)
    }

    async rebootTradfriGateway() {
        await (new Lights()).restartGateway();
    }
}
