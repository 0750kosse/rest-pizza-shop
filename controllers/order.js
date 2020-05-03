
const Order = require('../models/orders');

async function findAllOrders(req, res, next) {
  try {
    const orders = await Order.find({}).populate('product');
    const count = orders.length;
    if (!orders) return res.status(404).json({ message: "No orders yet" })
    else return res.status(200).json({ message: "Here are the orders", count, orders })
  } catch (e) {
    next(e)
  }
}

async function addOrder(req, res, next) {
  const order = {
    product: req.body.product,
    quantity: req.body.quantity
  }
  try {
    const userOrder = await Order.create(order);
    if (!userOrder) return res.status(404).json({ message: "No product ordered yet" })
    else return res.status(201).json({ userOrder })
  }
  catch (e) {
    next(e)
  }
}

async function getOrderDetails(req, res, next) {
  try {
    const uniqueOrder = await Order.findById(req.params.orderId).populate('product');
    if (!uniqueOrder) return res.status(404).json({ message: "Order not found with such ID" })
    else return res.status(200).json({ uniqueOrder })
  }
  catch (e) { next(e) }
}

async function updateOrder(req, res, next) {
  try {
    const order = await Order.findByIdAndUpdate({ _id: req.params.orderId }, { $set: req.body }, { new: true });
    if (!order) return res.status(404).json({ message: "Unable to update order with such ID" })
    else return res.status(200).json({ message: "Order updated", order })
  }
  catch (e) { next(e) }
}

async function deleteOrder(req, res, next) {
  try {
    const orderID = await Order.findByIdAndRemove({ _id: req.params.orderId });
    if (!orderID) return res.status(404).json({ message: "Can´t delete order with such ID" })
    else return res.status(200).json({ message: "Order deleted", orderID })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  findAllOrders,
  addOrder,
  getOrderDetails,
  updateOrder,
  deleteOrder
};


