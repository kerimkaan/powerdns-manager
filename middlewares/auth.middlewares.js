const helpers = require('../helpers');

module.exports.userAuth = async (req, res, next) => {
    try {
        if (!req.headers.username || !req.headers.password) throw new Error('You must provide password and username');
        const { username, password } = req.headers;
        // Is user exists?
        const isExists = await helpers.redis.isMemberOfSet('users-set', username);
        if (!isExists) throw new Error('The user does not exist');
        // Is password valid?
        const pass = await helpers.redis.hGet('users', username);
        if (pass !== password) throw new Error('Wrong password');
        return next();
    } catch (error) {
        return res.status(helpers.httpStatus.UNAUTHORIZED).json({
            status: helpers.httpStatus.UNAUTHORIZED,
            message: 'Authentication failed',
            error: error.message,
        });
    }
};

module.exports.hasOwnResource = async (req, res, next) => {
    try {
        const zoneName = req.params.zoneName || req.query.zoneName || req.body.zoneName;
        if (!zoneName) throw new Error('The resource name can not provided');
        const keyName = `ownedZones:${req.headers.username}`;
        const checkInRedis = await helpers.redis.isMemberOfSet(keyName, zoneName);
        if (!checkInRedis) {
            return res.status(helpers.httpStatus.UNAUTHORIZED).json({
                status: helpers.httpStatus.UNAUTHORIZED,
                message: 'You can get only owned resources',
            });
        }
        return next();
    } catch (error) {
        return res.status(helpers.httpStatus.UNAUTHORIZED).json({
            status: helpers.httpStatus.UNAUTHORIZED,
            message: 'Unauthorized',
            error: error.message,
        });
    }
};
