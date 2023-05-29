const { saleModel, productModel } = require('../models');
const schema = require('./validations/validateInputValues');

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const sale = await saleModel.findById(id);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const create = async (array) => {
  const errors = schema.validateValuesSales(array);
  const someError = errors.some((error) => error.type !== null);
  if (someError) {
    const finalError = errors.find((error) => error.type !== null);
    return finalError;
  }

  const validateProduct = array.map((sale) => productModel.findById(sale.productId));
  const productsResult = await Promise.all(validateProduct);
  const someNotFound = productsResult.some((product) => product === undefined);
  if (someNotFound) return { type: 'NOT_FOUND', message: 'Product not found' };

  const idNewSale = await saleModel.createSaleId();
  const newSales = array.map((sale) => saleModel.create(idNewSale, sale));
  const result = await Promise.all(newSales);

  // promise.all retorna [[{}] , [{},{}]] por isso result[1]
  return { message: { id: idNewSale, itemsSold: result[1] } };
};

module.exports = {
  findAll,
  findById,
  create,
};