import config from '@/config.json'
import LightService from '@/services/LightService'
import NotificationService from '@/services/NotificationService'

export default class PowerOffService {

    static async trigger() {
        NotificationService.show('Turning off', 'fa-power-off')
        await fetch(`${config.localApiBaseUrl}${config.powerOff.apiEndpoint}`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
        })
        await LightService.callLightChangeWatchers()
        NotificationService.clear();
    }
}
