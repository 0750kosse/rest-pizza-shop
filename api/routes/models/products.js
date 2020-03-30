const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    ref: 'Order'
  },
  price: {
    type: Number,
    required: true
  },
  id: mongoose.Schema.Types.ObjectId

})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;