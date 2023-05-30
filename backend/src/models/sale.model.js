// const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp 
    INNER JOIN sales AS s 
    ON s.id = sp.sale_id 
    ORDER BY sp.sale_id, sp.product_id`,
  );

  return result;
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id , sp.product_id`,
    [id],
  );

  return sale;
};

// função para criar novo id para nova sale de forma dinamica, utilizado em crate de service
const createSaleId = async () => {
  const [[result]] = await connection.execute(
    'SELECT MAX(id) AS id FROM sales',
  );

  const lastSaleId = Object.values(result);

  const idNewSale = lastSaleId[0] + 1;

  await connection.execute(
    'INSERT INTO sales (id) VALUE (?)',
    [idNewSale],
    );

  return idNewSale;
};

const create = async (idNewSale, sale) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?);',
    [idNewSale, sale.productId, sale.quantity],
  );

  const [result] = await connection.execute(
    `SELECT product_id AS productId, quantity
    FROM sales_products WHERE sale_id = ?`,
    [idNewSale],
  );

  return result;
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM sales
    WHERE id = ?`,
    [id],
  );

  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  createSaleId,
  create,
  deleteSale,
};