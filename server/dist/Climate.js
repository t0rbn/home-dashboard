var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        app.get(config.climate.apiEndpoint, (_req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(this.data);
        }));
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('reading sensor data');
                const res = yield sensor.read(11, config.climate.dht11gpioPin);
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
        });
    }
}
