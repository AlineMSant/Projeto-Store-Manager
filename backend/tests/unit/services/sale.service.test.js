const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');

const { saleModel } = require('../../../src/models');
const { allSales } = require('./mocks/sale.service.mock');

describe('Verificando service para sales', function () {
  describe('listagem de sales', function () {
    it('retorna lista com todas as sales', async function () {
      sinon.stub(saleModel, 'findAll').resolves(allSales);

      const result = await saleService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales);
    }); 
  });

  describe('listagem de sale por id', function () {
    it('retorna corretamente as sales por id', async function () {
      sinon.stub(saleModel, 'findById').resolves(allSales[2]);

      const result = await saleService.findById(2);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales[2]);
    });

    it('retorna mensagem de erro caso o id de sale não exista', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);

      const result = await saleService.findById(9999);

      expect(result.type).to.be.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    }); 
  });

  describe('removendo uma sale por id', function () {
    it('remove retornando null quando id existe ', async function () {
      sinon.stub(saleModel, 'findById').resolves(allSales[0]);
      sinon.stub(saleModel, 'deleteSale').resolves(1);

      const result = await saleService.deleteSale(1);

      expect(result.type).to.be.equal(null);
    });

    it('retorna mensagem de erro caso o id de sale não exista', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);

      const result = await saleService.deleteSale(9999);

      expect(result.type).to.be.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    }); 
  });

  afterEach(function () {
    sinon.restore();
  });
});