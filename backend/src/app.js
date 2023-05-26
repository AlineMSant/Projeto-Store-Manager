const express = require('express');
const { productRouter, saleRouter } = require('./routers');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productRouter);

app.use('/sales', saleRouter);

module.exports = app;
