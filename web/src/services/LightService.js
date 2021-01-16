import config from '../config.json'

export default class LightService {

    static ACTION_REFRESH_TIMEOUT_MS = 2000;
    static lightChangeWatchers = []
    static currentLightBulbs = []

    static async updateLights() {
        const response = await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/bulbs`)
        this.currentLightBulbs = await response.json()
        LightService.callLightChangeWatchers()
    }

    static async setlightBrightness(bulb, brightness) {
        await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/bulbs/${bulb}`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: brightness
        })
        await new Promise(r => setTimeout(r, this.ACTION_REFRESH_TIMEOUT_MS))
        await this.updateLights();
    }

    static async getScenes() {
        const response = await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/scenes`)
        return (await response.json())
    }

    static async getAccentColors() {
        const response = await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/accents`)
        return (await response.json())
    }

    static async selectScene(scene) {
        await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/scenes`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: scene
        })
        await new Promise(r => setTimeout(r, this.ACTION_REFRESH_TIMEOUT_MS))
        await this.updateLights();
    }

    static async selectAccentColor(name) {
        await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/accents`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: name
        })
        await new Promise(r => setTimeout(r, 500))
        await this.updateLights();
    }

    static callLightChangeWatchers() {
        LightService.lightChangeWatchers.forEach(e => e())
    }

    static registerLightChangeWatcher(watcher) {
        LightService.lightChangeWatchers.push(watcher)
    }
}
