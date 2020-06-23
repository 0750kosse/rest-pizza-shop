const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    ref: 'Order'
  },
  price: {
    type: Number,
    required: true
  },
  productImage: {
    type: String,
    required: true
  }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;