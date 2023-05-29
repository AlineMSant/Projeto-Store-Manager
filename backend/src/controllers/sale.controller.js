const { saleService } = require('../services');

const getAllSales = async (_req, res) => {
  const { message } = await saleService.findAll();

  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

const createSale = async (req, res) => {
  const array = req.body;
  const { message } = await saleService.create(array);

  if (message === '"quantity" is required' || message === '"productId" is required') {
    return res.status(400).json({ message });
  }

  if (message === '"quantity" must be greater than or equal to 1') {
    return res.status(422).json({ message });
  }

  res.status(201).json(message);
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};