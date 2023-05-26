const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');

const { productModel } = require('../../../src/models');
const { allProducts } = require('./mocks/products.service.mock');

describe('Verificando service para productos', function () {
  describe('listagem de produtos', function () {
    it('retorna lista todos os produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(allProducts);

      const result = await productService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    }); 
  });

  describe('listagem de um produto', function () {
    it('retorna corretamente o produto', async function () {
      sinon.stub(productModel, 'findById').resolves(allProducts[0]);

      const result = await productService.findById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });

    it('retorna mensagem de erro caso o produto não exista', async function () {
      sinon.stub(productModel, 'findById').resolves(false);

      const result = await productService.findById(9999);

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    }); 
  });

  afterEach(function () {
    sinon.restore();
  });
});