import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './Config.js'

import Lights from './Lights.js'
import Climate from './Climate.js'
import Logger from './Logger.js'
import Admin from './Admin.js'

const logger = new Logger('server')
logger.log('starting up')

const app = express()
app.use(bodyParser.text())
app.use(cors())

new Lights().registerEndpoints(app)
new Climate().registerEndpoints(app)
new Admin().registerEndpoints(app)

app._router.stack.forEach((layer: any) => {
    if (layer.route && layer.route.path) {
        logger.log(`registered path ${layer.route.path}`)
    }
})

app.use(express.static('client'))
app.listen(config.port, () => logger.log(`started on port ${config.port}`))
