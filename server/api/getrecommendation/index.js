'use strict';

var express = require('express');
var controller = require('./getrecommendation.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/placePhoto', controller.placePhoto);
router.post('/:lat/:lng', controller.getRecommendations);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;