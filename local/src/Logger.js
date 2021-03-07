export default class Logger {

    static maxUnitNameLength = 0;

    constructor(unitName = '') {
        this.unitName = unitName
        Logger.maxUnitNameLength = Math.max(Logger.maxUnitNameLength, unitName.length)
    }

    printString(symbol, text) {
        console.log(`${symbol} | ${new Date().toLocaleTimeString()} | ${this.unitName.padEnd(Logger.maxUnitNameLength, ' ')} | ${text}`)
    }

    log(text) {
        this.printString(' ', text)
    }

    alert(text) {
        this.printString('!', text)
    }
}