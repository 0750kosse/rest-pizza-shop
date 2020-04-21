const Product = require('../models/products');

function findAllProducts(req, res, next) {
  return Product.find({}).then((product) => {
    return product.length <= 0 ?
      res.status(404).json({ message: "No items found" }) :
      res.status(200).json({ message: "one product", product })
  })
}

function addProduct(req, res, next) {
  const myproduct = {
    name: req.body.name,
    price: req.body.price,
    id: req.body._id,
    productImage: req.file.path
  }
  Product.create(myproduct).then((product) => {
    res.status(201).json({ product })
  })
}

function getOneProduct(req, res, next) {
  Product.findById({ _id: req.params.menuId }).then(product => {
    return (!product) ? res.status(500).json({ message: "No item with such ID" }) : res.status(200).json({ product });
  })
    .catch(err => {
      res.status(500).json({ message: "Incorrect ID character length" })
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



module.exports = {
  findAllProducts,
  addProduct,
  getOneProduct,
  updateProduct,
  deleteProduct
};