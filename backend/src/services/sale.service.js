const { saleModel } = require('../models');

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
  const idNewSale = await saleModel.createSaleId();

  const newSales = array.map((sale) => saleModel.create(sale, idNewSale));
  const result = await Promise.all(newSales);

  // promise.all retorna [[{}] , [{},{}]] por isso result[1]
  return { message: { id: idNewSale, itemsSold: result[1] } };
};

module.exports = {
  findAll,
  findById,
  create,
};