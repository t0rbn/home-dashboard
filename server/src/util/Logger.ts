export default class Logger {

    private static maxUnitNameLength = 0
    private unitName: string

    constructor(unitName = '') {
        this.unitName = unitName
        Logger.maxUnitNameLength = Math.max(Logger.maxUnitNameLength, unitName.length)
    }

    private printString(symbol: string, text: string): void {
        console.log(`${symbol} | ${new Date().toLocaleTimeString()} | ${this.unitName.padEnd(Logger.maxUnitNameLength, ' ')} | ${text}`)
    }

    log(text: string): void {
        this.printString(' ', text)
    }

    alert(text: string): void {
        this.printString('!', `\x1b[31m${text}\x1b[0m`)
    }
}
