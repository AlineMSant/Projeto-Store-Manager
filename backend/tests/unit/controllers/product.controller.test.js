const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { allProducts, newProduct } = require('./mock/product.controller.mock');
const validateNewProduct = require('../../../src/middlewares/validateNewProduct');

describe('Teste de unidade do productController', function () {
  describe('Listando todas os produtos', function () {
    it('Deve retornar o status 200 e todos os produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findAll').resolves({ type: null, message: allProducts });

      await productController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
  });

  describe('Listando um produto', function () {
    it('Deve retornar o status 200 e o produto referente ao id', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findById').resolves({ type: null, message: allProducts[0] });

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });

    it('Deve retornar o status 404 e mensagem de erro caso não exista ', async function () {
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Criando um produto', function () {
    it('Deve retornar o status 201 e informações sobre o novo produto ', async function () {
      const res = {};
      const req = { body: { name: 'ProdutoX' } };

      const next = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'create').resolves({ type: null, message: newProduct });
      
      await validateNewProduct(req, res, next);
      await productController.createProduct(req, res);

      expect(next).to.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });

    it('Deve retornar o status 400 se não possuir body name valido ', async function () {
      const res = {};
      const req = { body: { xablau: 'ProdutoX' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('Deve retornar o status 422 se body name possuir menos de 5 caracteres', async function () {
      const res = {};
      const req = { body: { name: 'P' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json)
      .to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});