import config from '../config.json'

export default class AssetService {

    static getSceneIcon(scene) {
        return config.assets.sceneIcons[scene] || 'fa-question'
    }
}
