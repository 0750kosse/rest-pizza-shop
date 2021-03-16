const Product = require('../models/products');

function findAllProducts(req, res, next) {
  return Product.find({}).then((product) => {
    return product.length <= 0 ?
      res.status(404).json({ message: "No items found" }) :
      res.status(200).json({ message: "Our menu: ", product })
  })
}

function addProduct(req, res, next) {
  const myproduct = {
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    id: req.body._id,
    productImage: req.file.location
  }
  //req.file.location: provides image aws s3 url, which is now stored in mongoatlas
  return Product.create(myproduct).then((product) => {
    return product.length <= 0 ?
      res.status(404).json({ message: "No product added" }) :
      res.status(201).json({ message: 'Product added', product })
  })
}

function getOneProduct(req, res, next) {
  return Product.findById({ _id: req.params.menuId }).then((product) => {
    if (!product) return res.status(404).json({ message: "No item with such ID" })
    else return res.status(200).json({ message: "yayyyy", product })
  }).catch(err => {
    res.status(500).json({ message: "Something went wrong" })
  })
}

function updateProduct(req, res, next) {
  return Product.findByIdAndUpdate({ _id: req.params.menuId }, { $set: req.body }, { new: true }).then(product => {
    return res.status(200).json({ message: "Updated product", product })
  })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong updating this product" })
    })
}

function deleteProduct(req, res, next) {
  return Product.findByIdAndRemove({ _id: req.params.menuId }).then(product => {
    return (!product) ?
      res.status(404).json({ message: "Cant delete unexistent ID´s" }) :
      res.status(200).json({ message: 'Deleted product', product });
  })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong deleting this product" })
    })
}

module.exports = {
  findAllProducts,
  addProduct,
  getOneProduct,
  updateProduct,
  deleteProduct
};