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

module.exports = {
  findAll,
  findById,
  create,
};