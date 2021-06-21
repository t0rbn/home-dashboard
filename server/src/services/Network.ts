import {Service} from './Service'
import {Application, Request, Response} from 'express'
import {generateEndpointUrl} from '../Server.js'
import Logger from '../util/Logger.js'
import config from './Config.js'
// @ts-ignore
import speedTest from 'speedtest-net'

export type NetworkStatusResponse = {
    downloadMbps: number,
    ping: number
}

export default class Network implements Service {

    private logger = new Logger('network')
    private isMeasuring = false
    private data: NetworkStatusResponse = {
        downloadMbps: -1,
        ping: -1
    }

    constructor() {
        this.updateData().catch()
        setInterval(() => this.updateData(), config.network.updateIntervalMins * 60000)
    }

    registerEndpoints(app: Application): void {
        app.get(generateEndpointUrl('network'), async (_req: Request, res: Response) => {
            res.send(this.data)
        })
    }

    async updateData(): Promise<void> {
        if (this.isMeasuring) {
            console.log('measurement of network speed already running')
            return
        }
        this.isMeasuring = true

        this.logger.log('measuring network speeds')
        const result = await speedTest({acceptLicense: true, acceptGdpr: true})
        this.data = {
            downloadMbps: result.download.bandwidth / 125000,
            ping: result.ping.latency
        }

        this.isMeasuring = false
    }
}
