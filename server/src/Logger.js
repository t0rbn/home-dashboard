var Logger = /** @class */ (function () {
    function Logger(unitName) {
        if (unitName === void 0) { unitName = ''; }
        this.unitName = unitName;
        Logger.maxUnitNameLength = Math.max(Logger.maxUnitNameLength, unitName.length);
    }
    Logger.prototype.printString = function (symbol, text) {
        console.log(symbol + " | " + new Date().toLocaleTimeString() + " | " + this.unitName.padEnd(Logger.maxUnitNameLength, ' ') + " | " + text);
    };
    Logger.prototype.log = function (text) {
        this.printString(' ', text);
    };
    Logger.prototype.alert = function (text) {
        this.printString('!', "\u001B[31m" + text + "\u001B[0m");
    };
    Logger.maxUnitNameLength = 0;
    return Logger;
}());
export default Logger;
