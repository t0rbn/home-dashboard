export default class AssetService {

    static getBackgroundForScene(scene) {
        return `url('/scenes/${scene}.jpg')`;
    }
}
