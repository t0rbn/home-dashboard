import config from '../config.json'

export default class LightService {

    static lightChangeWatchers = []

    static async getLights() {
        const response = await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}`)
        return await response.json()
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
        await new Promise(r => setTimeout(r, 500))
        LightService.callLightChangeWatchers()
    }

    static async selectAccentColor(name) {
        await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/accents`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: name
        })
        await new Promise(r => setTimeout(r, 500))
        LightService.callLightChangeWatchers()
    }

    static async turnOffHome() {
        await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/off`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'}
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
