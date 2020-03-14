const express = require('express');
const router = express.Router();
const Product = require('../routes/models/products');

router.get('/', (req, res, next) => {
  Product.find({}).then((product) => {
    console.log("product coming from GET request", product)
    res.status(200).send({ product })
  })
})

router.post('/', (req, res, next) => {
  Product.create(req.body).then((product) => {
    res.status(201).send(product)
  })
})

router.get('/:menuId', (req, res, next) => {
  const id = req.params.menuId;
  if (id === 'special') {
    res.status(200).json({
      message: 'Correct',
      id: id
    })
  } else {
    res.status(200).json({
      message: 'diff than special'
    })
  }
})

router.patch('/:menuId', (req, res, next) => {
  res.status(200).json({
    message: 'updated product'
  })
})

router.delete('/:menuId', (req, res, next) => {
  res.status(200).json({
    message: 'deleted product'
  })
})

module.exports = router;