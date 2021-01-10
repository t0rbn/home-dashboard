import config from '../config.json'

export default class AssetService {

    static getPageHeaderPath(page) {
        return this.getImage(config.assets.pageHeaderBasePath, page, 'jpg');
    }

    static getSceneBackgroundPath(scene) {
        return this.getImage(config.assets.sceneBasePath, scene, 'jpg');
    }

    static getImage(basePath, name, extension) {
        return `url(${basePath + name}.${extension})`;
    }

}
