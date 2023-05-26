const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models'); 

const connection = require('../../../src/models/connection');
const { allSales } = require('./mocks/sale.model.mock');

describe('Testes de unidade do model de sales', function () {
  it('Recuperando lista de todos as sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const result = await saleModel.findAll();

    expect(result).to.be.deep.equal(allSales);
  });

  it('Recuperando produto por id', async function () {
    sinon.stub(connection, 'execute').resolves([allSales[2]]);

    const result = await saleModel.findById(2);

    expect(result).to.be.deep.equal(allSales[2]);
  });

afterEach(function () {
  sinon.restore();
});
});