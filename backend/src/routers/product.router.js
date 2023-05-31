const { Router } = require('express');
const { productController } = require('../controllers');
const validateNewProduct = require('../middlewares/validateNewProduct');

const router = Router();

router.get('/', productController.getAllProducts);

router.get('/search', productController.searchProduct);

router.get('/:id', productController.getProductById);

router.post('/', validateNewProduct, productController.createProduct);

router.put('/:id', validateNewProduct, productController.updateProductById);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
