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
        console.log(status);
        if (!data) throw new Error('Can not create zone');
        if (status === 201 || status === 200) {
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
