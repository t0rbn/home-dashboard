import config from '../config.json'

export default class LightService {

    static lightChangeWatchers = []
    static availableLightBulbs = []
    static availableScenes = []

    static async getSceneNames() {
        if (!this.availableScenes.length) {
            const response = await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/scenes`)
            this.availableScenes = await response.json()
        }
        return this.availableScenes.map(s => s.name)
    }

    static async getLightBulbs() {
        if (!this.availableLightBulbs.length) {
            const response = await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/bulbs`)
            this.availableLightBulbs = await response.json()
            LightService.callLightChangeWatchers()
        }
        return this.availableLightBulbs
    }

    static async selectScene(sceneName) {
        const scene = this.availableScenes.filter(s => s.name === sceneName)[0]
        if (!scene) {
            return
        }

        await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/scenes`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: scene.id
        })
        setTimeout(() => LightService.callLightChangeWatchers(), 1000)
    }

    static async selectColorTemperature(bulbid, percent) {
        await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/bulbs/${bulbid}/temperature`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: percent
        })
        setTimeout(() => LightService.callLightChangeWatchers(), 1000)
    }

    static async selectBrightness(bulbid, percent) {
        await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/bulbs/${bulbid}/brightness`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: percent
        })
        setTimeout(() => LightService.callLightChangeWatchers(), 1000)
    }

    static async selectRgbColor(bulbid, color) {
        await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/bulbs/${bulbid}/color`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: color
        })
        setTimeout(() => LightService.callLightChangeWatchers(), 1000)
    }

    static callLightChangeWatchers() {
        LightService.lightChangeWatchers.forEach(e => e())
    }

    static registerLightChangeWatcher(watcher) {
        LightService.lightChangeWatchers.push(watcher)
    }
}
