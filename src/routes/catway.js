var express = require('express');
var router = express.Router();

const service = require('../services/catways');

router.get('/catways/:catwayId/reservations/', service.getAll);

router.get('/catways/:catwayId/reservations/:id', service.getById);

router.post('/catways/:catwayId/reservations/', service.add);

router.put('/catways/:catwayId/reservations/:id', service.update);

router.delete('/catways/:catwayId/reservations/:id', service.delete);

module.exports = router;
