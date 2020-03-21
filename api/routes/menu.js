const express = require('express');
const router = express.Router();
const Product = require('../routes/models/products');

router.get('/', (req, res, next) => {
  Product.find({}).then((product) => {
    return product.length <= 0 ?
      res.status(404).json({ message: "No items found" }) :
      res.status(200).json({ product })
  })
})

router.post('/', (req, res, next) => {
  Product.create(req.body).then((product) => {
    res.status(201).send(product)
  })
})

router.get('/:menuId', (req, res, next) => {
  Product.findById({ _id: req.params.menuId }).then(product => {
    res.status(200).json(product)
  })
})

router.patch('/:menuId', (req, res, next) => {
  const updatedProduct = {
    name: req.body.name,
    price: req.body.price
  }
  Product.findByIdAndUpdate({ _id: req.params.menuId }, updatedProduct).then(product => {
    console.log("updated Product", updatedProduct, "product", product)
    res.status(200).json({ updatedProduct })
  })
})

router.delete('/:menuId', (req, res, next) => {
  const deletedProduct = {
    name: req.body.name,
    price: req.body.price
  }
  Product.findByIdAndRemove({ _id: req.params.menuId }, deletedProduct).then(product => {
    res.status(200).json({ deletedProduct })
  })
})

module.exports = router;