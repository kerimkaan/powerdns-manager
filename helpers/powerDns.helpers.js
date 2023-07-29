const axios = require('axios');

class PowerDNSAPI {
    constructor() {
        this.axiosInstance = this.createAxiosInstance;
        this.API_URL = 'http://127.0.0.1:8081';
        this.API_KEY = 1234;
        this.headers = {
            'X-API-Key': this.API_KEY,
            'Content-Type': 'application/json',
        };
    }

    createAxiosInstance() {
        return axios.create({
            baseURL: this.API_URL,
            headers: {
                'X-API-KEY': this.API_KEY,
                'Content-Type': 'application/json',
            },
        });
    }

    async getZones(serverId) {
        return this.createAxiosInstance(
            { url: `servers/${serverId}/zones` },
        );
    }

    async zones(serverId) {
        const url = `${this.API_URL}/api/v1/servers/${serverId}/zones`;
        console.log(url);
        console.log(this.headers);
        return axios.get(url, { headers: this.headers });
    }
}

module.exports = new PowerDNSAPI();
