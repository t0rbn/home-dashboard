import config from './Config.js'
import Logger from './Logger.js'
import {exec} from 'child_process'

export default class Network {

    pings = {}

    constructor() {
        this.logger = new Logger('network')
        this.takePingMeasurements()
        setInterval(() => this.takePingMeasurements(), config.network.ping.intervalMins * 60000)
    }

    registerEndpoints(app) {
        app.get(`${config.network.apiEndpoint}/pings`, async (req, res) => {
            res.send(this.pings)
        })
    }


    takePingMeasurements() {
        config.network.ping.destinations.forEach(host => {
            if (!this.pings[host]) {
                this.pings[host] = []
            }

            exec(`ping -c 1 -W ${config.network.ping.timeoutSeconds} ${host}`, (error, stdout) => {
                if (error) {
                    this.logger.alert(error)
                    return
                }

                const time = Number.parseFloat(stdout.match(/time=([0-9.]+) ms/)[1])
                this.logger.log(`measured ping of ${time} ms for ${host}`)
                this.pings[host].push(time)
                if (this.pings[host].length > config.network.ping.historyLength) {
                    this.pings[host].shift();
                }
            })



        })
    }

}