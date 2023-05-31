const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');

const { productModel } = require('../../../src/models');
const { allProducts, newProduct, updatedProduct } = require('./mocks/products.service.mock');

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

  describe('cria um produto', function () {
    it('cria um produto valido', async function () {
      sinon.stub(productModel, 'create').resolves(newProduct);

      const result = await productService.create('ProdutoX');

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(newProduct);
    });
  });

  describe('atualiza um produto', function () {
    it('atualiza com valores validos', async function () {
      sinon.stub(productModel, 'findById').resolves(allProducts[0]);
      sinon.stub(productModel, 'update').resolves(updatedProduct);

      const result = await productService.update(1, 'Martelo do Batman');

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(updatedProduct);
    });

    it('retorna mensagem de erro caso o valor name não exista', async function () {
      sinon.stub(productModel, 'findById').resolves(false);

      const result = await productService.update(999, 'Martelo do Batman');

      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  describe('remove um produto', function () {
    it('remove produco com id valido', async function () {
      sinon.stub(productModel, 'findById').resolves(allProducts[0]);
      sinon.stub(productModel, 'deleteProduct').resolves(1);

      const result = await productService.deleteProduct(1);

      expect(result.type).to.be.equal(null);
    });

    it('retorna mensagem de erro caso não encontre o id existente', async function () {
      sinon.stub(productModel, 'findById').resolves(false);

      const result = await productService.deleteProduct(999);

      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  describe('pesquisa por um produto', function () {
    it('pesquisa um produto que existe', async function () {
      sinon.stub(productModel, 'findAll').resolves(allProducts[0]);
      sinon.stub(productModel, 'search').resolves(allProducts[0]);

      const result = await productService.search(allProducts[0]);

      expect(result.message).to.be.equal(allProducts[0]);
    });

    it('pesquisa sem query', async function () {
      sinon.stub(productModel, 'findAll').resolves(allProducts);

      const result = await productService.search(false);

      expect(result.message).to.deep.equal(allProducts);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});