const { Router } = require('express');
const { saleController } = require('../controllers');

const router = Router();

router.get('/', saleController.getAllSales);

router.get('/:id', saleController.getSaleById);

module.exports = router;
