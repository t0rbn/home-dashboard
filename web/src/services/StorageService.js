export default class StorageService {

    static CURRENT_VIEW_KEY = 'page.current'

    static get(key) {
        return localStorage.getItem(key)
    }

    static set(key, value) {
        localStorage.setItem(key, value)
    }
}