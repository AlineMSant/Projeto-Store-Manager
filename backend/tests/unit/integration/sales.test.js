// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { app } = require('../../../src/app');

// const { expect } = chai;

// chai.use(chaiHttp);

// describe('Testando rota de Sales', function () {
//   describe('Usando a rota /sales', function () {
//     it('Testando metodo GET na rota /', async function () {
//       const output = [
//         {
//           saleId: 1,
//           date: '2023-05-31T18:30:21.000Z',
//           productId: 1,
//           quantity: 5,
//         },
//         {
//           saleId: 1,
//           date: '2023-05-31T18:30:21.000Z',
//           productId: 2,
//           quantity: 10,
//         },
//         {
//           saleId: 2,
//           date: '2023-05-31T18:30:21.000Z',
//           productId: 3,
//           quantity: 15,
//         },
//       ];

//       const response = await chai
//         .request(app)
//         .get('/sales');
//       expect(response.status).to.be.equal(200);
//       expect(response.body).to.deep.equal(output);
//     });
//   });
// });