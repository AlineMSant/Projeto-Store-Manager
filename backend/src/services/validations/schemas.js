const Joi = require('joi');

const addSales = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  addSales,
};