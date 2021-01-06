const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Logger = require('./Logger')

const config = require('./config.json')
const Lights = require('./Lights')
const PowerOff = require('./PowerOff')
const Climate = require('./Climate')

const app = express()
app.use(bodyParser.text())
app.use(cors())

const lights = new Lights()
const climate = new Climate()
const powerOff = new PowerOff(lights)

lights.registerEndpoints(app);
climate.registerEndpoints(app);
powerOff.registerEndpoints(app);

app.listen(config.port, () => Logger.server(`Application started on port ${config.port}`))
