const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: String,
  price: Number
})

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;