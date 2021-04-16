var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as fs from 'fs';
import config from './Config.js';
import { AccessoryTypes, discoverGateway, TradfriClient } from 'node-tradfri-client';
import Logger from './Logger.js';
var Lights = /** @class */ (function () {
    function Lights() {
        var _this = this;
        this.scenes = [];
        this.bulbs = [];
        this.logger = new Logger('lights');
        this.initConnection().then(function () { return _this.initDataAndListeners(); }).catch();
    }
    Lights.prototype.initConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gateway, identity, psk, credsFile, e_1, response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.log('discovering tradfri gateway');
                        return [4 /*yield*/, discoverGateway()];
                    case 1:
                        gateway = _a.sent();
                        if (!gateway) {
                            return [2 /*return*/];
                        }
                        this.logger.log('got gateway ' + gateway.name);
                        this.connection = new TradfriClient(gateway.name);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 3, , 5]);
                        this.logger.log('reading credentials from file');
                        credsFile = JSON.parse(fs.readFileSync(config.tradfri.credentialsFileLocation, 'utf-8'));
                        identity = credsFile.identity;
                        psk = credsFile.psk;
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        this.logger.alert('failed to read credentials from file, will reauthenticate');
                        return [4 /*yield*/, this.connection.authenticate(config.tradfri.securityId)];
                    case 4:
                        response = _a.sent();
                        identity = response.identity;
                        psk = response.psk;
                        fs.writeFile(config.tradfri.credentialsFileLocation, JSON.stringify({ identity: identity, psk: psk }), function () { return _this.logger.log('wrote new credentials'); });
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, this.connection.connect(identity, psk)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Lights.prototype.initDataAndListeners = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deleteScene, addOrUpdateScene, deleteBulb, addOrUpdateBulb;
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.connection) {
                    return [2 /*return*/];
                }
                deleteScene = function (id) {
                    _this.scenes = _this.scenes.filter(function (s) { return s.instanceId !== id; });
                };
                addOrUpdateScene = function (scene) {
                    _this.logger.log("retrieved information for scene " + scene.name);
                    deleteScene(scene.instanceId);
                    _this.scenes.push(scene);
                };
                deleteBulb = function (id) {
                    _this.bulbs = _this.bulbs.filter(function (b) { return b.instanceId !== id; });
                };
                addOrUpdateBulb = function (device) {
                    deleteBulb(device.instanceId);
                    if (device.type === AccessoryTypes.lightbulb) {
                        _this.logger.log("retrieved information for lightbulb " + device.name);
                        _this.bulbs.push(device);
                    }
                };
                this.connection
                    .on('scene updated', function (_group, scene) { return addOrUpdateScene(scene); })
                    .on('scene removed', function (_group, instanceId) { return deleteScene(instanceId); })
                    .on('group updated', function (group) {
                    if (group.name === 'SuperGroup') {
                        _this.superGroup = group;
                    }
                })
                    .observeGroupsAndScenes()
                    .catch();
                this.connection
                    .on('device updated', function (device) { return addOrUpdateBulb(device); })
                    .on('device removed', function (instanceId) { return deleteBulb(instanceId); })
                    .observeDevices()
                    .catch();
                return [2 /*return*/];
            });
        });
    };
    Lights.prototype.registerEndpoints = function (app) {
        var _this = this;
        app.get(config.tradfri.apiEndpoint + '/bulbs', function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.send(this.getBulbs());
                return [2 /*return*/];
            });
        }); });
        app.post(config.tradfri.apiEndpoint + "/bulbs/:id/brightness", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.setBulbBrightness(Number.parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, 10), Number.parseFloat(req.body))];
                    case 1:
                        _b.sent();
                        res.sendStatus(200);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _b.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        app.post(config.tradfri.apiEndpoint + "/bulbs/:id/temperature", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var e_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.setBulbTemperature(Number.parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, 10), Number.parseFloat(req.body))];
                    case 1:
                        _b.sent();
                        res.sendStatus(200);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _b.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        app.post(config.tradfri.apiEndpoint + "/bulbs/:id/color", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var e_4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.setBulbColor(Number.parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, 10), req.body)];
                    case 1:
                        _b.sent();
                        res.sendStatus(200);
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _b.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        app.get(config.tradfri.apiEndpoint + '/scenes', function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.send(this.scenes);
                return [2 /*return*/];
            });
        }); });
        app.post(config.tradfri.apiEndpoint + "/scenes", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.setScene(Number.parseInt(req.body, 10))];
                    case 1:
                        _a.sent();
                        res.sendStatus(200);
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Lights.prototype.getBulbs = function () {
        return this.bulbs.map(function (bulb) {
            var _a, _b, _c, _d;
            return ({
                name: bulb.name,
                id: bulb.instanceId,
                spectrum: (_a = bulb.lightList[0]) === null || _a === void 0 ? void 0 : _a.spectrum,
                color: '#' + ((_b = bulb.lightList[0]) === null || _b === void 0 ? void 0 : _b.color),
                brightness: ((_c = bulb.lightList[0]) === null || _c === void 0 ? void 0 : _c.onOff) ? (((_d = bulb.lightList[0]) === null || _d === void 0 ? void 0 : _d.dimmer) / 100) : 0
            });
        });
    };
    Lights.prototype.setBulbBrightness = function (bulbId, brightness) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var bulb, newBrightness;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bulb = this.bulbs.filter(function (bulb) { return bulb.instanceId === bulbId; })[0];
                        if (!bulb) {
                            this.logger.alert('cannot set brightness for unknown bulb');
                            throw 'unknown lightbulb';
                        }
                        newBrightness = Math.max(0, Math.min(100, Math.round(brightness * 100)));
                        return [4 /*yield*/, ((_a = this.connection) === null || _a === void 0 ? void 0 : _a.operateLight(bulb, {
                                dimmer: newBrightness,
                                onOff: newBrightness > 0
                            }))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Lights.prototype.setBulbTemperature = function (bulbId, temp) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var bulb, spectrum, newTemp;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        bulb = this.bulbs.filter(function (bulb) { return bulb.instanceId === bulbId; })[0];
                        if (!bulb) {
                            this.logger.alert('cannot set temperature for unknown bulb');
                            throw 'unknown lightbulb';
                        }
                        spectrum = (_a = bulb.lightList[0]) === null || _a === void 0 ? void 0 : _a.spectrum;
                        if (spectrum !== 'white') {
                            this.logger.alert('temperature not supported by spectrum');
                            throw 'temperature operation not supported';
                        }
                        newTemp = Math.max(1, Math.min(100, Math.round(temp * 100)));
                        return [4 /*yield*/, ((_b = this.connection) === null || _b === void 0 ? void 0 : _b.operateLight(bulb, { colorTemperature: newTemp }))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Lights.prototype.setBulbColor = function (bulbId, hexColor) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var bulb, spectrum;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        bulb = this.bulbs.filter(function (bulb) { return bulb.instanceId === bulbId; })[0];
                        if (!bulb) {
                            this.logger.alert('cannot set temperature for unknown bulb');
                            throw 'unknown lightbulb';
                        }
                        spectrum = (_a = bulb.lightList[0]) === null || _a === void 0 ? void 0 : _a.spectrum;
                        if (spectrum !== 'rgb') {
                            this.logger.alert('color operation not supported by spectrum');
                            throw 'color operation not supported';
                        }
                        return [4 /*yield*/, ((_b = this.connection) === null || _b === void 0 ? void 0 : _b.operateLight(bulb, { color: hexColor.replace('#', '') }))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Lights.prototype.setScene = function (sceneId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.superGroup) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, ((_a = this.connection) === null || _a === void 0 ? void 0 : _a.operateGroup(this.superGroup, { sceneId: sceneId }, true))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Lights;
}());
export default Lights;
