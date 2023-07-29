const helpers = require('../helpers');

module.exports.userAuth = async (req, res, next) => {
    try {
        console.log(req.headers.username);
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
