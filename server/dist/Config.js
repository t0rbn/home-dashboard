export default {
    'port': 8001,
    'tradfri': {
        'apiEndpoint': '/api/lights',
        'securityId': 'WqupW3ys67g1PUeh',
        'credentialsFileLocation': 'tradfri_credentials.json'
    },
    'climate': {
        'updateReadingIntervalMins': 5,
        'historyLength': 144,
        'apiEndpoint': '/api/climate',
        'dht11gpioPin': 18,
        'temperatureOffset': -3,
        'humidityOffset': 0
    },
    'admin': {
        'apiEndpoint': '/api/admin'
    }
};
