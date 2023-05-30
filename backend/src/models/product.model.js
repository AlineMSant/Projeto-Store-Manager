const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );

  return result;
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );

  return product;
};

const create = async (name) => {
  await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );

  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );

  return product;
};

const update = async (id, name) => {
  await connection.execute(
    `UPDATE products
    SET name = ?
    WHERE id = ?`,
    [name, id],
  );

  return findById(id);  
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM products
    WHERE id = ?`,
    [id],
  );

  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteProduct,
};