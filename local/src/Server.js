const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Logger = require('./Logger')
const Climate = require('./Climate')

const config = require('./config.json')
const Lights = require('./Lights')
const TurnOff = require('./PowerOff')

const app = express()
app.use(bodyParser.text())
app.use(cors())

new Lights().registerEndpoints(app)
new Climate().registerEndpoints(app)
new TurnOff().registerEndpoints(app)

app.listen(config.port, () => Logger.server(`Application started on port ${config.port}`))
