const express = require('express');
const router = express.Router();
const Product = require('../../models/products');
const paths = require('../paths');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
});

const upload = multer({ storage: storage })

function findAllProducts(req, res, next) {
  Product.find({}).then((product) => {
    return product.length <= 0 ?
      res.status(404).json({ message: "No items found" }) :
      res.status(200).json({ product })
  })
}

function addProduct(req, res, next) {
  console.log("req.file ", req.file)
  Product.create(req.body).then((product) => {
    res.status(201).send(product)
  })
}

function getOneProduct(req, res, next) {
  Product.findById({ _id: req.params.menuId }).then(product => {
    return (!product) ? res.status(500).json({ message: "No item with such ID" }) : res.status(200).json({ product });
  })
    .catch(err => {
      console.log(err.name, "Incorrect ID character length");
    })
}

function updateProduct(req, res, next) {
  Product.findByIdAndUpdate({ _id: req.params.menuId }, { $set: req.body }, { new: true }).then(product => {
    res.status(200).json(product)
  })
}

function deleteProduct(req, res, next) {
  Product.findByIdAndRemove({ _id: req.params.menuId }).then(product => {
    return (!product) ? res.status(500).json({ message: "Cant delete unexistent ID´s" }) : res.status(200).json(product);
  })
    .catch(err => {
      res.status(500).json({ message: "Incorrect ID character length" })
    })
}

router.get(paths.menu, findAllProducts);
router.get(paths.menu + ':menuId', getOneProduct)

router.post(paths.menu, upload.single('productImage'), addProduct);
router.patch(paths.menu + ':menuId', updateProduct)
router.delete(paths.menu + ':menuId', deleteProduct);

module.exports = router;