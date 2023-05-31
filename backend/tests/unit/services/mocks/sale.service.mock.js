const allSales = [
  {
    saleId: 1,
    date: '2023-05-26T22:48:57.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-26T22:48:57.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-05-26T22:48:57.000Z',
    productId: 3,
    quantity: 15,
  },
];

const inputCreateSale = [
  {
    productId: 1,
    quantity: 1,
  },
];

const inputErrorCreateSale = [
  {
    xablau: 1,
    quantity: 1,
  },
];

const inputErrorProduct = [
  {
    productId: 9999,
    quantity: 1,
  },
];

const resultCreateSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

const updatedSale = {
  date: '2023-05-06T03:14:28.000Z',
  productId: 2,
  quantity: 20,
  saleId: 1,
};

const product = {
  id: 2,
  name: 'Traje de encolhimento',
};

module.exports = {
  allSales,
  inputCreateSale,
  inputErrorCreateSale,
  inputErrorProduct,
  resultCreateSale,
  updatedSale,
  product,
};