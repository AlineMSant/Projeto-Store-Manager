const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { allSales, inputNewSale, newSale,
  incorrectInput, incorrectQuantity,
  inputNoProduct, updatedSale } = require('./mock/sale.controller.mock');
const validateUpdateSale = require('../../../src/middlewares/validateUpdateSale');

describe('Teste de unidade de saleController', function () {
  const saleNotFound = 'Sale not found';

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
      .resolves({ type: 'SALE_NOT_FOUND', message: saleNotFound });

      await saleController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: saleNotFound });
    });
  });

  describe('criando sales', function () {
    it('Deve retornar o status 201 e retorno correto para dados validos', async function () {
      const res = {};
      const req = { body: inputNewSale };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'create').resolves({ message: newSale });

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSale);
    });

    it('Deve retornar o status 400 e mensagem de erro', async function () {
      const res = {};
      const req = { body: incorrectInput };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'create')
      .resolves({ type: 'INVALID_VALUES', message: '"productId" is required' });

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('Deve retornar o status 422 e mensagem de erro', async function () {
      const res = {};
      const req = { body: incorrectQuantity };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'create')
      .resolves({
        type: 'INVALID_VALUES',
        message: '"quantity" must be greater than or equal to 1' });

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1' });
    });

    it('Deve retornar o status 404 e mensagem de erro', async function () {
      const res = {};
      const req = { body: inputNoProduct };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'create')
      .resolves({
        type: 'NOT_FOUND',
        message: 'Product not found' });

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found' });
    });
  });

  describe('Atualizando uma sale', function () {
    it('Deve retornar o status 200 quando atualiza uma sale com sucesso', async function () {
      const res = {};
      const req = { params: { saleId: 1, productId: 2 }, body: { quantity: 20 } };

      const next = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'update').resolves({ type: null, message: updatedSale });

      await validateUpdateSale(req, res, next);
      await saleController.updateSale(req, res);

      expect(next).to.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedSale);
    });

    it('Deve retornar o status 404 e mensagem de erro ', async function () {
      const res = {};
      const req = { params: { saleId: 9999, productId: 2 }, body: { quantity: 20 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'update').resolves({ type: 'NOT_FOUND', message: saleNotFound });

      await saleController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: saleNotFound });
    });

    it('Deve retornar o status 400 e mensagem de erro ', async function () {
      const res = {};
      const req = { params: { saleId: 1, productId: 2 }, body: { xablau: 20 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateUpdateSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('Deve retornar o status 422 e mensagem de erro ', async function () {
      const res = {};
      const req = { params: { saleId: 1, productId: 2 }, body: { quantity: 0 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateUpdateSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1' });
    });
  });

  describe('Deletando uma sale', function () {
    it('Deve retornar o status 204 quando remove uma sale', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'deleteSale').resolves({ type: null });

      await saleController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('Deve retornar o status 404 e mensagem de erro ', async function () {
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'deleteSale')
      .resolves({ type: 'SALE_NOT_FOUND', message: saleNotFound });

      await saleController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: saleNotFound });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});