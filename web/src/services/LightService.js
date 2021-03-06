import config from '../config.json'
import NotificationService from '@/services/NotificationService'

export default class LightService {

    static lightChangeWatchers = []
    static currentLightBulbs = []

    static async updateLights() {
        const response = await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/bulbs`)
        this.currentLightBulbs = await response.json()
        LightService.callLightChangeWatchers()
    }

    static async getScenes() {
        const response = await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/scenes`)
        return (await response.json())
    }

    static async selectScene(scene) {
        await NotificationService.show('applying scene...', 'fa-robot')
        await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/scenes`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: scene
        })
        await this.updateLights()
        await NotificationService.clear()
    }

    static callLightChangeWatchers() {
        LightService.lightChangeWatchers.forEach(e => e())
    }

    static registerLightChangeWatcher(watcher) {
        LightService.lightChangeWatchers.push(watcher)
    }
}
