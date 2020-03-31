const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({

  id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }

});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;




