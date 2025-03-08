const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.consultar)

router.post('/', salesController.crear)

router.route('/:id')
  .get(salesController.consultarId)
  .delete(salesController.borrar)
  .put( salesController.actualizar)

module.exports = router;