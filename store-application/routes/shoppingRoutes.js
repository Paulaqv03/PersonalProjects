const express = require('express');
const router = express.Router();
const shoppingConroller = require('../controllers/shoppingController');

router.get('/', shoppingConroller.consultar)

router.post('/', shoppingConroller.crear)

router.route('/:id')
  .put( shoppingConroller.actualizar)
  .get( shoppingConroller.consultarId)
  .delete( shoppingConroller.borrar)

module.exports = router;