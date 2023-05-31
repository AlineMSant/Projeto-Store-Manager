const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');

const { saleModel, productModel } = require('../../../src/models');
const { allSales, product,
  updatedSale, inputCreateSale,
  inputErrorCreateSale, inputErrorProduct,
  resultCreateSale } = require('./mocks/sale.service.mock');
const { validateValuesSales } = require('../../../src/services/validations/validateInputValues');
const schemas = require('../../../src/services/validations/schemas');

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

  describe('atualizando uma sale', function () {
    it('atualiza a quantity de uma sale com sucesso', async function () {
      sinon.stub(saleModel, 'findById').resolves(allSales[0]);
      sinon.stub(productModel, 'findById').resolves(product);
      sinon.stub(saleModel, 'update').resolves(updatedSale);

      const result = await saleService.update(20, 1, 2);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(updatedSale);
    });

    it('retorna mensagem de erro caso o id de sale não exista', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);

      const result = await saleService.update(20, 9999, 2);

      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });

    it('retorna mensagem de erro caso o id de product não exista', async function () {
      sinon.stub(saleModel, 'findById').resolves(allSales[0]);
      sinon.stub(productModel, 'findById').resolves(false);

      const result = await saleService.update(20, 1, 999);

      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found in sale');
    }); 
  });

  describe('cria uma sale', function () {
    it('retorna erro em validateValues', async function () {
      sinon.stub(schemas, 'addSales').resolves({
        message: { type: 'INVALID_VALUES', message: '"productId" is required' } });
      const error = validateValuesSales(inputErrorCreateSale);
      const result = await saleService.create(inputErrorCreateSale);

      expect(error[0].type).to.be.equal('INVALID_VALUES');
      expect(error[0].message).to.be.equal('"productId" is required');
      expect(result.type).to.be.equal('INVALID_VALUES');
      expect(result.message).to.be.equal('"productId" is required');
    });

    it('retorna mensagem de erro caso não encontre um produto', async function () {
      sinon.stub(schemas, 'addSales').resolves({ type: null, message: '' });
      sinon.stub(productModel, 'findById').resolves(undefined);

      const result = await saleService.create(inputErrorProduct);

      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });

    it('retorna a sale criada', async function () {
      sinon.stub(schemas, 'addSales').resolves({ type: null, message: '' });
      sinon.stub(productModel, 'findById').resolves({
        id: 1,
        name: 'Martelo de Thor',
      });
      sinon.stub(saleModel, 'createSaleId').resolves(3);
      sinon.stub(saleModel, 'create').resolves(inputCreateSale);

      const result = await saleService.create(inputCreateSale);

      expect(result).to.deep.equal({ message: resultCreateSale });
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