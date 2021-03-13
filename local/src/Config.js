export default {
  "port": 8001,
  "tradfri": {
    "apiEndpoint": "/lights",
    "securityId": "WqupW3ys67g1PUeh",
    "credentialsFileLocation": "./src/tradfri_credentials.json"
  },
  "climate": {
    "updateReadingIntervalMins": 1,
    "historyLength":  120,
    "apiEndpoint": "/climate",
    "dht11gpioPin": 18,
    "temperatureOffset": -3,
    "humidityOffset": 0
  },
  "admin": {
    "apiEndpoint": "/admin"
  }
}
