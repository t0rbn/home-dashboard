import config from '../config.json'
import NotificationService from '@/services/NotificationService'

export default class LightService {

    static lightChangeWatchers = []
    static currentLightBulbs = []
    static availableScenes = []

    static async updateLights() {
        const response = await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/bulbs`)
        this.currentLightBulbs = await response.json()
        LightService.callLightChangeWatchers()
    }

    static async getSceneNames() {
        if (!this.availableScenes.length) {
            const response = await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/scenes`)
            this.availableScenes = await response.json()
        }
        return this.availableScenes.map(s => s.name)
    }

    static async selectScene(sceneName) {
        const scene = this.availableScenes.filter(s => s.name === sceneName)[0]
        if (!scene) {
            return
        }

        await NotificationService.show('applying scene...', 'fa-robot')
        await fetch(`${config.localApiBaseUrl}${config.lights.apiEndpoint}/scenes`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: scene.id
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
