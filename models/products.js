const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
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
    require: true
  }

})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;