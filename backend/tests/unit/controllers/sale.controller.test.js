const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { allSales } = require('./mock/sale.controller.mock');

describe('Teste de unidade de saleController', function () {
  describe('Listando todas as sales', function () {
    it('Deve retornar o status 200 e todas as sales', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findAll').resolves({ type: null, message: allSales });

      await saleController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });
  });

  describe('Listando uma sale', function () {
    it('Deve retornar o status 200 e as sales referentes ao id', async function () {
      const res = {};
      const req = { params: { id: 2 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findById').resolves({ type: null, message: allSales[2] });

      await saleController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales[2]);
    });

    it('Deve retornar o status 404 e mensagem de erro caso o id não exista ', async function () {
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findById')
      .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await saleController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});