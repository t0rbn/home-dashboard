import config from '@/config.json'


export default class SettingsService {
    static refresh() {
        window.location.reload()
    }

    static killsystemDService() {
        if (!window.confirm('Restart systemd service?')) {
            return
        }
        fetch(`${config.localApiBaseUrl}${config.admin.apiEndpoint}/kill`)
        setTimeout(() => this.refresh(), 1000)
    }
}
