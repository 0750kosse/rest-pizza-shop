const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "handling GET requests to /products"
  })
})

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: "handling POST requests to /products"
  })
})

router.get('/:menuId', (req, res, next) => {
  const id = req.params.menuId;
  if (id === 'special') {
    res.status(200).json({
      message: 'Correct',
      id: id
    })
  } else {
    res.status(200).json({
      message: 'diff than special'
    })
  }
})

router.patch('/:menuId', (req, res, next) => {
  res.status(200).json({
    message: 'updated product'
  })
})

router.delete('/:menuId', (req, res, next) => {
  res.status(200).json({
    message: 'deleted product'
  })
})

module.exports = router;