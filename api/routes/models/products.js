const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  id: mongoose.Schema.Types.ObjectId
})

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;