import config from '../config.json'
// import MockedClimateResponse from './MockedClimateResponse.json'

export default class ClimateService {

    static climateData
    static lastUpdateTimeStamp = 0

    static async updateClimate() {
        // this.climateData =  MockedClimateResponse;
        if (!this.climateData || this.lastUpdateTimeStamp + (1000 * config.climate.cachingTimeSeconds) < Date.now()) {
            this.lastUpdateTimeStamp = Date.now()
            const response = await fetch(`${config.localApiBaseUrl}${config.climate.apiEndpoint}`)
            this.climateData = await response.json()
        }
    }

    static async getTemperatures() {
        await this.updateClimate()
        return this.climateData.map(d => d.temp)
    }

    static async getHumidities() {
        await this.updateClimate()
        return this.climateData.map(d => d.humidity)
    }


}
