import config from '../config.json'
// import MockedClimateResponse from './MockedClimateResponse.json'

export default class ClimateService {

    static climateData

    static async updateClimate() {
        // this.climateData =  MockedClimateResponse;
        if (!this.climateData) {
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
