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

const inputNewSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const incorrectInput = [
  {
    xablau: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const incorrectQuantity = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const inputNoProduct = [
  {
    productId: 9999,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = {
  allSales,
  inputNewSale,
  newSale,
  incorrectInput,
  incorrectQuantity,
  inputNoProduct,
};