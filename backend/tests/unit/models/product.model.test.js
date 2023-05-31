const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models'); 

const connection = require('../../../src/models/connection');
const { allProducts,
  newProduct,
  inputUpdateProduct,
  retornoUpdateProduct } = require('./mocks/product.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando lista de todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productModel.findAll();

    expect(result).to.be.deep.equal(allProducts);
  });

  it('Recuperando produto por id', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

    const result = await productModel.findById(1);

    expect(result).to.be.deep.equal(allProducts[0]);
  });

  it('Cria um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([[newProduct]]);

    const result = await productModel.create({ name: 'ProdutoX' });

    expect(result).to.be.deep.equal(newProduct);
  });

  it('altera um produto', async function () {
    sinon.stub(connection, 'execute').resolves([[retornoUpdateProduct]]);

    const result = await productModel.update(inputUpdateProduct);

    expect(result).to.be.deep.equal(retornoUpdateProduct);
  });

  it('Deleta um produto por id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productModel.deleteProduct(2);

    expect(result).to.be.equal(1);
  });

  it('Pesquisa produto', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productModel.search();

    expect(result).to.be.equal(allProducts);
  });

afterEach(function () {
  sinon.restore();
});
});