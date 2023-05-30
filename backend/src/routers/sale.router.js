const { Router } = require('express');
const { saleController } = require('../controllers');
const validateUpdateSale = require('../middlewares/validateUpdateSale');

const router = Router();

router.get('/', saleController.getAllSales);

router.get('/:id', saleController.getSaleById);

router.post('/', saleController.createSale);

router.put('/:saleId/products/:productId/quantity', validateUpdateSale, saleController.updateSale);

router.delete('/:id', saleController.deleteSale);

module.exports = router;
