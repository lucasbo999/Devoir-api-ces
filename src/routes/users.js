var express = require('express');
var router = express.Router();

const service = require('../services/users');
const auth = require('../services/auth');

const private = require('../../middlewares/private');

router.post('/authenticate', auth.authenticate);

router.post('/add', service.add);

router.get('/:id', private.checkJWT, service.getById);

router.patch('/:id', private.checkJWT, service.update);

router.delete('/:id', private.checkJWT, service.delete);



module.exports = router;
