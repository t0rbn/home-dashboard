import config from '../../config.json'

export default class LightService {

    static lightChangeWatchers = []

    static async getLights() {
        const response = await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}`)
        return await response.json()
    }

    static async getScenes() {
        const response = await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/scenes`)
        return (await response.json()).map(scene => scene === 'ALLOFF' ? 'All off' : scene)
    }

    static async selectScene(scene) {
        scene = scene === 'All off' ? 'ALLOFF' : scene
        await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/scenes`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: scene
        })
        await new Promise(r => setTimeout(r, 500))
        LightService.callLightChangeWatchers()
    }

    static callLightChangeWatchers() {
        LightService.lightChangeWatchers.forEach(e => e())
    }

    static registerLightChangeWatcher(watcher) {
        LightService.lightChangeWatchers.push(watcher)
    }
}
