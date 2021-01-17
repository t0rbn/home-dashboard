export default class NotificationService {

    static watchers = []

    static registerWatcher(e) {
        NotificationService.watchers.push(e)
    }

    static show(text, icon) {
        this.watchers.forEach(e => e(text, icon))
    }

    static clear() {
        this.show(null, null)
    }

}