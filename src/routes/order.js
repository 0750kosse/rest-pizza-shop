const express = require('express');
const router = express.Router();

const Order = require('../../models/orders');


router.get('/', (req, res, next) => {
  Order.find({}).then(orders => {
    return orders.length <= 0 ?
      res.status(404).json({ message: "No orders yet" }) :
      res.status(200).json({
        count: orders.length,
        orders
      })
  })
    .catch(err => console.log(err))
})

router.post('/', (req, res, next) => {
  Order.create(req.body).then(customerOrder => {
    res.status(201).json({ customerOrder })
  })
    .catch(err => console.log(err))
})

router.get('/:orderId', (req, res, next) => {
  Order.findById({ _id: req.params.orderId })
    .then(uniqueOrder => {
      res.json({ uniqueOrder })
    })
    .catch(function (err) {
      res.json(err);
    });
})

router.patch('/:orderId', (req, res, next) => {
  Order.findByIdAndUpdate({ _id: req.params.orderId }, { $set: req.body }, { new: true }).then(order => {
    console.log(order)
    res.status(200).json({
      message: "order updated",
      order
    })
  })
})

router.delete('/:orderId', (req, res, next) => {
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
})

module.exports = router;


