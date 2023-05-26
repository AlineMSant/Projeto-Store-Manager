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

module.exports = {
  getAllSales,
  getSaleById,
};