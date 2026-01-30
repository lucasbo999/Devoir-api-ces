var express = require('express');
var router = express.Router();

const userRoute = require('./users');
const catwayRoute = require('./catway');
const reservationRoute = require('./reservation');


router.use('/users', userRoute);
router.use('/catway', catwayRoute);
router.use('/reservation', reservationRoute);

module.exports = router;
