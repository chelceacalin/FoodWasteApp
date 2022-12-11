const router = require('express').Router();
const quantityController = require('../controller/quantityController');

router.post("/", quantityController.addQuantity);
router.get('/', quantityController.getAllQuantities);
router.get('/:id', quantityController.getSingleQuantity);
router.delete('/:id', quantityController.deleteQuantityById);
router.delete('/', quantityController.deleteallQuantities);
router.put('/:id', quantityController.updateQuantity);
module.exports = router;