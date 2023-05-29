const { addSales } = require('./schemas');

const validateValuesSales = (arraySales) => {
  const errorRequired = arraySales.map((sale) => {
    const { error } = addSales.validate(sale);
    if (error) return { type: 'INVALID_VALUES', message: error.message };
    return { type: null, message: '' };  
  });

  return errorRequired;
};

module.exports = {
  validateValuesSales,
};
