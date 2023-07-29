const express = require('express');
const m = require('../middlewares');
const { users: userControllers } = require('../controllers');

const router = express.Router();

router.get(
    '/',
    m.auth.userAuth,
    userControllers.getUsers,
);

router.post(
    '/',
    userControllers.createUser,
);

module.exports = router;
