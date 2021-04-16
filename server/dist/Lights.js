var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from 'fs';
import config from './Config.js';
import { AccessoryTypes, discoverGateway, TradfriClient } from 'node-tradfri-client';
import Logger from './Logger.js';
export default class Lights {
    constructor() {
        this.scenes = [];
        this.bulbs = [];
        this.logger = new Logger('lights');
        this.initConnection().then(() => this.initDataAndListeners()).catch();
    }
    initConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('discovering tradfri gateway');
            const gateway = yield discoverGateway();
            if (!gateway) {
                return;
            }
            this.logger.log('got gateway ' + gateway.name);
            this.connection = new TradfriClient(gateway.name);
            let identity;
            let psk;
            try {
                this.logger.log('reading credentials from file');
                let credsFile = JSON.parse(fs.readFileSync(config.tradfri.credentialsFileLocation, 'utf-8'));
                identity = credsFile.identity;
                psk = credsFile.psk;
            }
            catch (e) {
                this.logger.alert('failed to read credentials from file, will reauthenticate');
                const response = yield this.connection.authenticate(config.tradfri.securityId);
                identity = response.identity;
                psk = response.psk;
                fs.writeFile(config.tradfri.credentialsFileLocation, JSON.stringify({ identity, psk }), () => this.logger.log('wrote new credentials'));
            }
            yield this.connection.connect(identity, psk);
        });
    }
    initDataAndListeners() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                return;
            }
            const deleteScene = (id) => {
                this.scenes = this.scenes.filter(s => s.instanceId !== id);
            };
            const addOrUpdateScene = (scene) => {
                this.logger.log(`retrieved information for scene ${scene.name}`);
                deleteScene(scene.instanceId);
                this.scenes.push(scene);
            };
            const deleteBulb = (id) => {
                this.bulbs = this.bulbs.filter(b => b.instanceId !== id);
            };
            const addOrUpdateBulb = (device) => {
                deleteBulb(device.instanceId);
                if (device.type === AccessoryTypes.lightbulb) {
                    this.logger.log(`retrieved information for lightbulb ${device.name}`);
                    this.bulbs.push(device);
                }
            };
            this.connection
                .on('scene updated', (_group, scene) => addOrUpdateScene(scene))
                .on('scene removed', (_group, instanceId) => deleteScene(instanceId))
                .on('group updated', (group) => {
                if (group.name === 'SuperGroup') {
                    this.superGroup = group;
                }
            })
                .observeGroupsAndScenes()
                .catch();
            this.connection
                .on('device updated', (device) => addOrUpdateBulb(device))
                .on('device removed', (instanceId) => deleteBulb(instanceId))
                .observeDevices()
                .catch();
        });
    }
    registerEndpoints(app) {
        app.get(config.tradfri.apiEndpoint + '/bulbs', (_req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(this.getBulbs());
        }));
        app.post(`${config.tradfri.apiEndpoint}/bulbs/:id/brightness`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.setBulbBrightness(Number.parseInt(id, 10), Number.parseFloat(req.body));
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(500);
            }
        }));
        app.post(`${config.tradfri.apiEndpoint}/bulbs/:id/temperature`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.setBulbTemperature(Number.parseInt(id, 10), Number.parseFloat(req.body));
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(500);
            }
        }));
        app.post(`${config.tradfri.apiEndpoint}/bulbs/:id/color`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.setBulbColor(Number.parseInt(id, 10), req.body);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(500);
            }
        }));
        app.get(config.tradfri.apiEndpoint + '/scenes', (_req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(this.getScenes());
        }));
        app.post(`${config.tradfri.apiEndpoint}/scenes`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.setScene(Number.parseInt(req.body, 10));
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(500);
            }
        }));
    }
    getBulbs() {
        return this.bulbs.map(bulb => {
            var _a, _b, _c, _d;
            return ({
                name: bulb.name,
                id: bulb.instanceId,
                spectrum: (_a = bulb.lightList[0]) === null || _a === void 0 ? void 0 : _a.spectrum,
                color: '#' + ((_b = bulb.lightList[0]) === null || _b === void 0 ? void 0 : _b.color),
                brightness: ((_c = bulb.lightList[0]) === null || _c === void 0 ? void 0 : _c.onOff) ? (((_d = bulb.lightList[0]) === null || _d === void 0 ? void 0 : _d.dimmer) / 100) : 0
            });
        });
    }
    setBulbBrightness(bulbId, brightness) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const bulb = this.bulbs.filter(bulb => bulb.instanceId === bulbId)[0];
            if (!bulb) {
                this.logger.alert('cannot set brightness for unknown bulb');
                throw 'unknown lightbulb';
            }
            const newBrightness = Math.max(0, Math.min(100, Math.round(brightness * 100)));
            yield ((_a = this.connection) === null || _a === void 0 ? void 0 : _a.operateLight(bulb, {
                dimmer: newBrightness,
                onOff: newBrightness > 0
            }));
        });
    }
    setBulbTemperature(bulbId, temp) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const bulb = this.bulbs.filter(bulb => bulb.instanceId === bulbId)[0];
            if (!bulb) {
                this.logger.alert('cannot set temperature for unknown bulb');
                throw 'unknown lightbulb';
            }
            const spectrum = (_a = bulb.lightList[0]) === null || _a === void 0 ? void 0 : _a.spectrum;
            if (spectrum !== 'white') {
                this.logger.alert('temperature not supported by spectrum');
                throw 'temperature operation not supported';
            }
            const newTemp = Math.max(1, Math.min(100, Math.round(temp * 100)));
            yield ((_b = this.connection) === null || _b === void 0 ? void 0 : _b.operateLight(bulb, { colorTemperature: newTemp }));
        });
    }
    setBulbColor(bulbId, hexColor) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const bulb = this.bulbs.filter(bulb => bulb.instanceId === bulbId)[0];
            if (!bulb) {
                this.logger.alert('cannot set temperature for unknown bulb');
                throw 'unknown lightbulb';
            }
            const spectrum = (_a = bulb.lightList[0]) === null || _a === void 0 ? void 0 : _a.spectrum;
            if (spectrum !== 'rgb') {
                this.logger.alert('color operation not supported by spectrum');
                throw 'color operation not supported';
            }
            yield ((_b = this.connection) === null || _b === void 0 ? void 0 : _b.operateLight(bulb, { color: hexColor.replace('#', '') }));
        });
    }
    getScenes() {
        return this.scenes.map((scene) => ({ name: scene.name, id: scene.instanceId }));
    }
    setScene(sceneId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.superGroup) {
                return;
            }
            yield ((_a = this.connection) === null || _a === void 0 ? void 0 : _a.operateGroup(this.superGroup, { sceneId }, true));
        });
    }
}
