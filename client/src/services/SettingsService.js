import config from '@/config.json'


export default class SettingsService {
    static refresh() {
        window.location.reload()
    }

    static restartSystemDService() {
        if (!window.confirm('Restart systemd service?')) {
            return
        }
        fetch(`${config.localApiBaseUrl}${config.admin.apiEndpoint}/actions/restartSystemD`)
        setTimeout(() => this.refresh(), 5000)
    }


    static restartTradfriGateWay() {
        if (!window.confirm('Restart tradfri gateway?')) {
            return
        }
        fetch(`${config.localApiBaseUrl}${config.admin.apiEndpoint}/actions/restartTradfriGateway`)
        setTimeout(() => this.refresh(), 5000)
    }
}
