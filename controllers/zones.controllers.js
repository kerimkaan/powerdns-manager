const h = require('../helpers');
const c = require('../constants');

module.exports.getZones = async (req, res) => {
    try {
        const { data } = await h.powerDns.getZones(c.powerDns.serverId);
        if (!data) throw new Error('No zones in server');
        return res.status(h.httpStatus.OK).json({
            status: h.httpStatus.OK,
            message: 'Success',
            zones: data,
        });
    } catch (err) {
        return res.status(h.httpStatus.INTERNAL_SERVER_ERROR).json({
            status: h.httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong',
            error: err.message,
        });
    }
};

module.exports.getZoneDetail = async (req, res) => {
    try {
        const { zoneName } = req.params;
        if (!zoneName) throw new Error('Must be provide zoneName');
        const { data } = await h.powerDns.getZoneDetails(c.powerDns.serverId, String(zoneName));
        if (!data) throw new Error('No record in zone');
        return res.status(h.httpStatus.OK).json({
            status: h.httpStatus.OK,
            message: 'Success',
            records: data,
        });
    } catch (err) {
        return res.status(h.httpStatus.INTERNAL_SERVER_ERROR).json({
            status: h.httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong',
            error: err.message,
        });
    }
};

module.exports.createZone = async (req, res) => {
    try {
        const { zoneName, nameServers, masters } = req.body;
        if (!zoneName || !nameServers) throw new Error('Must be provide zoneName and nameServers');
        if (!Array.isArray(nameServers)) throw new Error('nameServers must be an array');
        const { data, status } = await h.powerDns.createZone(c.powerDns.serverId, {
            name: zoneName,
            nameServers,
            masters,
        });
        if (!data) throw new Error('Can not create zone');
        if (status === 201 || status === 200) {
            const keyName = `ownedZones:${req.headers.username}`;
            await h.redis.addToSet(keyName, zoneName);
            return res.status(h.httpStatus.OK).json({
                status: h.httpStatus.OK,
                message: 'Success',
                records: data,
            });
        }
        throw new Error('Unhandled situation');
    } catch (err) {
        return res.status(h.httpStatus.INTERNAL_SERVER_ERROR).json({
            status: h.httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong',
            error: err.message,
            err,
        });
    }
};

module.exports.deleteZone = async (req, res) => {
    try {
        const { zoneName } = req.params;
        if (!zoneName) throw new Error('Must be provide zoneName');
        // eslint-disable-next-line no-unused-vars
        const { data, status } = await h.powerDns.deleteZone(c.powerDns.serverId, zoneName);
        if (status === 204) {
            const keyName = `ownedZones:${req.headers.username}`;
            await h.redis.removeFromSet(keyName, zoneName);
            return res.status(h.httpStatus.OK).json({
                status: h.httpStatus.OK,
                message: 'Success',
            });
        }
        throw new Error('Unhandled situation');
    } catch (err) {
        return res.status(h.httpStatus.INTERNAL_SERVER_ERROR).json({
            status: h.httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong',
            error: err.message,
            err,
        });
    }
};

module.exports.patchZone = async (req, res) => {
    try {
        const { zoneName } = req.params;
        const { records } = req.body;
        if (!zoneName || !records) throw new Error('Must be provide zoneName and body');
        if (!Array.isArray(records)) throw new Error('records field must be an array');
        // eslint-disable-next-line no-unused-vars
        const { status } = await h.powerDns.newRecordsToZone(
            c.powerDns.serverId,
            zoneName,
            records,
        );
        if (status === 204) {
            return res.status(h.httpStatus.OK).json({
                status: h.httpStatus.OK,
                message: 'Success',
            });
        }
        throw new Error('Unhandled situation');
    } catch (err) {
        return res.status(h.httpStatus.INTERNAL_SERVER_ERROR).json({
            status: h.httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong',
            error: err.message,
            err,
        });
    }
};

module.exports.deleteRecord = async (req, res) => {
    try {
        const { zoneName } = req.params;
        const { records } = req.body;
        if (!zoneName || !records) throw new Error('Must be provide zoneName and body');
        if (!Array.isArray(records)) throw new Error('records field must be an array');
        // eslint-disable-next-line no-unused-vars
        const { status } = await h.powerDns.deleteRecord(
            c.powerDns.serverId,
            zoneName,
            records,
        );
        if (status === 204) {
            return res.status(h.httpStatus.OK).json({
                status: h.httpStatus.OK,
                message: 'Success',
            });
        }
        throw new Error('Unhandled situation');
    } catch (err) {
        return res.status(h.httpStatus.INTERNAL_SERVER_ERROR).json({
            status: h.httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong',
            error: err.message,
            err,
        });
    }
};
