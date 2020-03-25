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
    return (!product) ? res.status(500).json({ message: "No item with such ID" }) : res.status(200).json({ product });
  })
    .catch(err => {
      console.log(err.name, "Incorrect ID character length");
    })
})

router.patch('/:menuId', (req, res, next) => {
  Product.findByIdAndUpdate({ _id: req.params.menuId }, { $set: req.body }, { new: true }).then(product => {
    res.status(200).json(product)
  })
})

router.delete('/:menuId', (req, res, next) => {
  Product.findByIdAndRemove({ _id: req.params.menuId }).then(product => {
    return (!product) ? res.status(500).json({ message: "Cant delete unexistent ID´s" }) : res.status(200).json(product);
  })
    .catch(err => {
      res.status(500).json({ message: "Incorrect ID character length" })
    })
})

module.exports = router;