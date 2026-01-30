var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const catwayRoute = require('../routes/catway');
const reservationRoute = require('../routes/reservation');


router.use('/users', userRoute);
router.use('/catway', catwayRoute);
router.use('/reservation', reservationRoute);

module.exports = router;
