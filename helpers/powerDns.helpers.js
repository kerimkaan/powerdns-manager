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

    // Example:
    /* {
        "name": "example.org.",
        "kind": "Native",
        "masters":
        [],
        "nameservers":
        [
            "ns1.example.org.",
            "ns2.example.org."
        ]
    } */
    async createZone(serverId, body) {
        if (!body.name || !body.nameServers) throw new Error('Name and nameservers must be specified');
        if (!Array.isArray(body.nameServers)) throw new Error('Nameservers must be an array');
        const reqBody = {
            name: String(body.name),
            kind: 'Native',
            masters: body.masters || [],
            nameservers: body.nameServers || [],
        };
        const url = `${this.API_URL}/api/v1/servers/${serverId}/zones`;
        return axios.post(url, reqBody, { headers: this.headers });
    }
}

module.exports = new PowerDNSAPI();
