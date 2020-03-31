const express = require('express');
const router = express.Router();
const Order = require('../../models/orders');
const paths = require('../paths')

function findAllOrders(req, res, next) {
  Order.find({})
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
  Order.create(req.body).then(customerOrder => {
    res.status(201).json({ customerOrder })
  })
    .catch(err => console.log(err))
}

function getOrderDetails(req, res, next) {
  Order.findById(req.params.orderId)
    .populate('product')
    .then(uniqueOrder => {
      res.json({ uniqueOrder })
    })
    .catch(function (err) {
      res.json(err);
    });
}

function updateOrder(req, res, next) {
  Order.findByIdAndUpdate({ _id: req.params.orderId }, { $set: req.body }, { new: true }).then(order => {
    res.status(200).json({
      message: "order updated",
      order
    })
  })
}

function deleteOrder(req, res, next) {
  Order.findByIdAndRemove({ _id: req.params.orderId }).then(deletedOrder => {
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

router.get(paths.order, findAllOrders);
router.get(paths.order + ':orderId', getOrderDetails);
router.post(paths.order, addOrder);
router.patch(paths.order + ':orderId', updateOrder)
router.delete(paths.order + ':orderId', deleteOrder)

module.exports = router;


