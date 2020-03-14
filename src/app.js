const env = require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('../api/routes/menu');
const orderRoutes = require('../api/routes/order');

mongoose
  .connect(process.env.DATABASE_URL, { dbName: 'rest-pizza-shop', useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to db"))
  .catch(err => console.log(`Could not Connected to db ${process.env.DB_CONNECTION} `, err));

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