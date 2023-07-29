const axios = require('axios');

class PowerDNSAPI {
    constructor() {
        this.API_URL = 'http://127.0.0.1:8081'; // to .env
        this.API_KEY = 1234; // to .env
        this.headers = {
            'X-API-Key': this.API_KEY,
            'Content-Type': 'application/json',
        };
    }

    async getZones(serverId) {
        const url = `${this.API_URL}/api/v1/servers/${serverId}/zones`;
        return axios.get(url, { headers: this.headers });
    }

    async getZoneDetails(serverId, zoneName) {
        const url = `${this.API_URL}/api/v1/servers/${serverId}/zones/${zoneName}`;
        return axios.get(url, { headers: this.headers });
    }
}

module.exports = new PowerDNSAPI();
