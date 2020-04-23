
const Order = require('../models/orders');


function findAllOrders(req, res, next) {
  return Order.find({})
    .populate('product')
    .then(orders => {
      return orders.length <= 0 ?
        res.status(404).json({ message: "No orders yet" }) :
        res.status(200).json({
          count: orders.length,
          orders
        })
    })
    .catch(err => console.log(err))
}

function addOrder(req, res, next) {
  const order = {
    product: req.body.product,
    quantity: req.body.quantity
  }
  return Order.create(order).then(customerOrder => {
    res.status(201).json({ customerOrder })
  })
    .catch(err => console.log(err))
}

function getOrderDetails(req, res, next) {
  return Order.findById(req.params.orderId)
    .populate('product')
    .then(uniqueOrder => {
      res.json({ uniqueOrder })
    })
    .catch(function (err) {
      res.json(err);
    });
}

function updateOrder(req, res, next) {
  return Order.findByIdAndUpdate({ _id: req.params.orderId }, { $set: req.body }, { new: true }).then(order => {
    res.status(200).json({
      message: "order updated",
      order
    })
  })
}

function deleteOrder(req, res, next) {
  return Order.findByIdAndRemove({ _id: req.params.orderId }).then(deletedOrder => {
    return (!deletedOrder) ?
      res.status(500).json("Cant delete unexistent ID´s") :
      res.status(200).json({
        message: "deleted order",
        deletedOrder
      })
  })
    .catch(err => {
      res.status(500).json({
        message: "Incorrect ID character length",
        error: err
      })
    })
}



module.exports = {
  findAllOrders,
  addOrder,
  getOrderDetails,
  updateOrder,
  deleteOrder
};


