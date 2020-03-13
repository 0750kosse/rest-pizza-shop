const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')

const productRoutes = require('../api/routes/menu');
const orderRoutes = require('../api/routes/order')

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/menu', productRoutes);
app.use('/order', orderRoutes);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200), json({});
  }
  next();
})

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