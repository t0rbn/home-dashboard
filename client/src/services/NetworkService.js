import config from '../config.json'
// import MockedClimateResponse from './MockedClimateResponse.json'

export default class NetworkService {

    static networkData
    static lastUpdateTimeStamp = 0

    static async updateNetworkData() {
        if (!this.networkData || this.lastUpdateTimeStamp + (1000 * config.network.cachingTimeSeconds) < Date.now()) {
            this.lastUpdateTimeStamp = Date.now()
            const response = await fetch(`${config.localApiBaseUrl}${config.network.apiEndpoint}`)
            this.networkData = await response.json()
        }
    }

    static async getData() {
        await this.updateNetworkData()
        return this.networkData
    }

}
