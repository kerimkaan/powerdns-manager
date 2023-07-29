const h = require('../helpers');

module.exports.getZones = async (req, res) => {
    try {
        const zones = await h.powerDns.zones('localhost');
        console.log(zones);
        if (!zones) throw new Error('No zones in server');
        return res.status(h.httpStatus.OK).json({
            status: h.httpStatus.OK,
            message: 'Success',
            zones,
        });
    }
    catch (err) {
        return res.status(h.httpStatus.INTERNAL_SERVER_ERROR).json({
            status: h.httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong',
            error: err.message,
        });
    }
};
