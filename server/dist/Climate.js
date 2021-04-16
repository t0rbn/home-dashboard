import config from './Config.js';
import sensor from 'node-dht-sensor';
import Logger from './Logger.js';
export default class Climate {
    constructor() {
        this.data = [];
        this.logger = new Logger('climate');
        this.read().catch();
        setInterval(() => this.read(), config.climate.updateReadingIntervalMins * 60000);
    }
    registerEndpoints(app) {
        app.get(config.climate.apiEndpoint, async (_req, res) => {
            res.send(this.data);
        });
    }
    async read() {
        try {
            this.logger.log('reading sensor data');
            const res = await sensor.read(11, config.climate.dht11gpioPin);
            this.logger.log('got new sensor data: ' + res.temperature + 'C' + ' | ' + res.humidity + '%');
            this.data.push({
                timeStamp: Date.now(),
                temp: res.temperature + config.climate.temperatureOffset,
                humidity: (res.humidity + config.climate.humidityOffset) / 100
            });
            if (this.data.length > config.climate.historyLength) {
                this.data.shift();
            }
        }
        catch (e) {
            this.logger.alert('Unable to read climate sensor data');
        }
    }
}
