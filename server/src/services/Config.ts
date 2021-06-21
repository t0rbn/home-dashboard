export default {
    'server': {
        'port': 8000,
        'apiBaseUrl': '/api'
    },
    'tradfri': {
        'apiEndpoint': '/lights',
        'securityId': 'WqupW3ys67g1PUeh',
        'credentialsFileLocation': 'tradfri_credentials.json'
    },
    'climate': {
        'updateReadingIntervalMins': 5,
        'apiEndpoint': '/climate',
        'dht11gpioPin': 18,
        'temperatureOffset': -3,
        'humidityOffset': 0
    },
    'admin': {
        'apiEndpoint': '/admin',
    },
    'network': {
        'updateIntervalMins': 30,
        'apiEndpoint': '/network',
    },
}
