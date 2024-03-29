const router = require('express').Router();
const productController = require('../controller/productController');

router.post("/", productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getSingleProduct);
router.delete('/:id', productController.deleteProductById);
router.delete('/', productController.deleteall);
router.put('/:id', productController.updateProduct);
router.get('/user/:id', productController.getProductsByID);


module.exports = router;