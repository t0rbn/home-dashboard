const sensor = require('node-dht-sensor')
const config = require('./config.json')
const logger = require('./Logger')


module.exports = class IndoorClimate {

    currentData = {history: []}

    constructor() {
        setInterval(() => this.updateCurrent(), config.climate.updateReadingIntervalMins * 60000)
        setInterval(() => this.updateHistory(), config.climate.updateHistoryIntervalMins * 60000)
    }

    registerEndpoints(app) {
        app.get(config.climate.apiEndpoint, async (req, res) => {
            res.send(await this.get())
        })
    }

    async read() {
        try {
            logger.climate('Updating sensor data')
            const res = await sensor.read(11, config.climate.dht11gpioPin)
            return {
                timeStamp: Date.now(),
                temp: res.temperature + config.climate.temperatureOffset,
                humidity: (res.humidity + config.climate.humidityOffset) / 100
            }
        } catch (e) {
            logger.climate('Failed to update status: ' + e)
        }
    }


    async get() {
        if (!this.currentData.current) {
            await this.updateCurrent()
        }
        return this.currentData
    }

    async updateCurrent() {
        const newValues = await this.read()
        if (!newValues) {
            return
        }
        this.currentData.current = newValues
    }

    async updateHistory() {
        const newValues = await this.read()
        if (!newValues) {
            return
        }
        this.currentData.history.push(newValues)
        if (this.currentData.history.length > config.climate.historyLength) {
            this.currentData.history = this.currentData.history.slice(1)
        }
    }
}
