const helpers = require('../helpers');

module.exports.getUsers = async (req, res) => {
    try {
        const allUsers = await helpers.redis.getSet('users-set');
        if (allUsers) {
            return res.status(helpers.httpStatus.OK).json({
                status: helpers.httpStatus.OK,
                message: 'Succesfully fetched',
                users: allUsers,
            });
        }
        return res.status(helpers.httpStatus.NOT_FOUND).json({
            status: helpers.httpStatus.NOT_FOUND,
            message: 'Not found',
        });
    } catch (error) {
        return res.status(helpers.httpStatus.INTERNAL_SERVER_ERROR).json({
            status: helpers.httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};

module.exports.createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) throw new Error('Invalid username or password');
        const isExists = await helpers.redis.isMemberOfSet('users-set', username);
        if (!isExists) {
            await helpers.redis.hSet('users', username, password);
            await helpers.redis.addToSet('users-set', username);
            return res.status(helpers.httpStatus.OK).json({
                status: helpers.httpStatus.OK,
                message: 'Successfully created',
                username,
            });
        }
        return res.status(helpers.httpStatus.CONFLICT).json({
            status: helpers.httpStatus.CONFLICT,
            message: 'Username is already exists',
            username,
        });
    } catch (error) {
        return res.status(helpers.httpStatus.INTERNAL_SERVER_ERROR).json({
            status: helpers.httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};
