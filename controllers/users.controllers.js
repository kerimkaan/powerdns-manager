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
        await helpers.redis.hSet('users', username, password);
        await helpers.redis.addToSet('users-set', username);
        return res.status(helpers.httpStatus.OK).json({
            status: helpers.httpStatus.OK,
            message: 'Successfully created',
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