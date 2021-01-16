import config from '../config.json'

export default class AssetService {

    static getPageHeaderPath(page) {
        return this.getImage(config.assets.pageHeaderBasePath, page, 'jpg')
    }

    static getSceneIcon(scene) {
        return config.assets.sceneIcons[scene] || 'fa-question'
    }

    static getImage(basePath, name, extension) {
        return `url(${basePath + name}.${extension})`
    }

}
