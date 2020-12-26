import config from '../../config.json'
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

    static async getCurrent() {
        await this.updateClimate()
        return this.climateData.current
    }

    static async getHistory() {
        await this.updateClimate()
        return this.climateData.history
    }

}
