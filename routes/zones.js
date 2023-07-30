const express = require('express');
const m = require('../middlewares');
const { zones: zonesControllers } = require('../controllers');

const router = express.Router();

router.get(
    '/',
    // m.auth.userAuth,
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

router.delete(
    '/:zoneName',
    // m.auth.userAuth,
    zonesControllers.deleteZone,
);

router.patch(
    '/:zoneName',
    // m.auth.userAuth,
    zonesControllers.patchZone,
);

module.exports = router;
