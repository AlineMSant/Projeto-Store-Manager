const { productModel } = require('../models');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const product = await productModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const create = async (name) => {
  const newProduct = await productModel.create(name);

  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  create,
};
