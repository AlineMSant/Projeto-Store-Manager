const { productModel } = require('../models');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const search = async (q) => {
  if (!q) {
 const allProduct = await productModel.findAll(); 
 return { message: allProduct };
}
    
  const product = await productModel.search(q);
  return { message: product };
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

const update = async (id, name) => {
  const product = await productModel.findById(id);

  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };

  const updatedProduct = await productModel.update(id, name);

  return { type: null, message: updatedProduct };
};

const deleteProduct = async (id) => {
  const product = await productModel.findById(id);

  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };

  await productModel.deleteProduct(id);

  return { type: null };
};

module.exports = {
  findAll,
  search,
  findById,
  create,
  update,
  deleteProduct,
};
