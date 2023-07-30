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
    m.auth.userAuth,
    zonesControllers.getZoneDetail,
);

router.post(
    '/',
    m.auth.userAuth,
    zonesControllers.createZone,
);

router.delete(
    '/:zoneName',
    m.auth.userAuth,
    m.auth.hasOwnResource,
    zonesControllers.deleteZone,
);

router.patch(
    '/:zoneName',
    m.auth.userAuth,
    m.auth.hasOwnResource,
    zonesControllers.patchZone,
);

router.delete(
    '/:zoneName/record',
    m.auth.userAuth,
    m.auth.hasOwnResource,
    zonesControllers.deleteRecord,
);

module.exports = router;
