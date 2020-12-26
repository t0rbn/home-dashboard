const config = require('./config.json')

module.exports = class Logger {

    static tradfri(text) {
        Logger.print('Tradfri', text)
    }

    static server(text) {
        Logger.print('Server', text)
    }

    static climate(text) {
        Logger.print('Climate', text)
    }

    static print(moduleName, text) {
        const formatted = `[${new Date().toLocaleString()}] ${moduleName}:${'.'.repeat(20 - moduleName.length)} ${text}`
        console.log(formatted)
    }
}
