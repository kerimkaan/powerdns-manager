const express = require('express');
const m = require('../middlewares');
const { zones: zonesControllers } = require('../controllers');

const router = express.Router();

router.get(
    '/',
    // m.auth.userAuth,
    zonesControllers.getZones,
);

module.exports = router;
