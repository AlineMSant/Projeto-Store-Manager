const { Router } = require('express');
const { productController } = require('../controllers');

const router = Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post('/', productController.createProduct);

module.exports = router;
