const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models'); 

const connection = require('../../../src/models/connection');
const { allProducts } = require('./mocks/product.model.mock');

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

afterEach(function () {
  sinon.restore();
});
});