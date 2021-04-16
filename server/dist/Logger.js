export default class Logger {
    constructor(unitName = '') {
        this.unitName = unitName;
        Logger.maxUnitNameLength = Math.max(Logger.maxUnitNameLength, unitName.length);
    }
    printString(symbol, text) {
        console.log(`${symbol} | ${new Date().toLocaleTimeString()} | ${this.unitName.padEnd(Logger.maxUnitNameLength, ' ')} | ${text}`);
    }
    log(text) {
        this.printString(' ', text);
    }
    alert(text) {
        this.printString('!', `\x1b[31m${text}\x1b[0m`);
    }
}
Logger.maxUnitNameLength = 0;
