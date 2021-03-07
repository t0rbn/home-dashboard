import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './Config.js'

import Lights from './Lights.js'
import Climate from './Climate.js'
import Logger from './Logger.js'

const logger = new Logger('Server')
logger.log("starting up")

const app = express()
app.use(bodyParser.text())
app.use(cors())

new Lights().registerEndpoints(app)
new Climate().registerEndpoints(app)
app.listen(config.port, () => logger.log(`started on port ${config.port}`));