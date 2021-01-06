import config from '@/config.json'

export default class PowerOffService {

    static async trigger() {
        await fetch(`${config.localApiBaseUrl}${config.powerOff.apiEndpoint}`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
        })
        await new Promise(r => setTimeout(r, 500))
    }
}
