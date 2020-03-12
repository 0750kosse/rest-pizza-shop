const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')

const productRoutes = require('../api/routes/menu');
const orderRoutes = require('../api/routes/order')

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/order', orderRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app listening on port ${port}`))