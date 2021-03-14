export default {
  "port": 8001,
  "tradfri": {
    "apiEndpoint": "/lights",
    "securityId": "WqupW3ys67g1PUeh",
    "credentialsFileLocation": "./src/tradfri_credentials.json"
  },
  "climate": {
    "updateReadingIntervalMins": 5,
    "historyLength":  144,
    "apiEndpoint": "/climate",
    "dht11gpioPin": 18,
    "temperatureOffset": -3,
    "humidityOffset": 0
  },
  "network": {
    "apiEndpoint": "/network",
    "ping": {
      "destinations": ["google.com", "192.168.0.1"],
      "timeoutSeconds": 5,
      "intervalMins": 10,
      "historyLength": 72
    }
  },
  "admin": {
    "apiEndpoint": "/admin"
  }
}
