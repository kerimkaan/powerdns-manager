const axios = require('axios');
const textHelper = require('./text.helpers');

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
        const dottedNameServers = body.nameServers.map((value) => textHelper.addDot(value));
        const reqBody = {
            name: textHelper.addDot(body.name),
            kind: 'Native',
            masters: body.masters || [],
            nameservers: dottedNameServers || [],
        };
        const url = `${this.API_URL}/api/v1/servers/${serverId}/zones`;
        return axios.post(url, reqBody, { headers: this.headers });
    }

    async deleteZone(serverId = '', zoneName = '') {
        const url = `${this.API_URL}/api/v1/servers/${serverId}/zones/${zoneName}`;
        return axios.delete(url, { headers: this.headers });
    }

    // Example:
    /* {
        "rrsets":
        [
            {
                "name": "test.example.org.",
                "type": "A",
                "ttl": 3600,
                "changetype": "REPLACE",
                "records":
                [
                    {
                        "content": "192.168.0.5",
                        "disabled": false
                    }
                ]
            }
        ]
    } */
    async newRecordsToZone(serverId = '', zoneName = '', records = []) {
        if (!serverId || !zoneName || !records) throw new Error('Missing parameters');
        const isNotValid = records.some(
            (record) => !record.name || !record.type || !record.changetype || !record.records,
        );
        if (isNotValid) {
            throw new Error('Invalid rrsets');
        }
        const manipulation = (record) => ({ ...record, name: textHelper.addDot(record.name) });
        const dottedRecords = records.forEach(manipulation);
        console.log(dottedRecords);
        const url = `${this.API_URL}/api/v1/servers/${serverId}/zones/${zoneName}`;
        return axios.patch(url, { rrsets: dottedRecords }, { headers: this.headers });
    }
}

module.exports = new PowerDNSAPI();
