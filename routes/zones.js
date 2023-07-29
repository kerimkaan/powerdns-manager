const express = require('express');
const m = require('../middlewares');
const { zones: zonesControllers } = require('../controllers');

const router = express.Router();

router.get(
    '/',
    m.auth.userAuth,
    zonesControllers.getZones,
);

router.get(
    '/detail/:zoneName',
    // m.auth.userAuth,
    zonesControllers.getZoneDetail,
);

router.post(
    '/',
    zonesControllers.createZone,
);

module.exports = router;
