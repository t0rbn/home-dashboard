import config from './Config.js'
import sensor from 'node-dht-sensor'
import Logger from './Logger.js'
import {Service} from './Service'
import {Application, Request, Response} from 'express'
import {generateEndpointUrl} from './Server.js';

export type ClimateEntry = {
    temp: number,
    humidity: number
}

export default class Climate implements Service {

    private logger = new Logger('climate')
    private data: ClimateEntry = {
        temp: -1,
        humidity: -1
    }

    constructor() {
        this.read().catch()
        setInterval(() => this.read(), config.climate.updateReadingIntervalMins * 60000)
    }

    registerEndpoints(app: Application): void {
        app.get(generateEndpointUrl('climate'), async (_req: Request, res: Response) => {
            res.send(this.data)
        })
    }

    async read(): Promise<void> {
        try {
            const res = await sensor.read(11, config.climate.dht11gpioPin)
            this.data = {
                temp: res.temperature + config.climate.temperatureOffset,
                humidity: (res.humidity + config.climate.humidityOffset) / 100
            }
        } catch (e) {
            this.logger.alert('Unable to read climate sensor data')
        }
    }
}
