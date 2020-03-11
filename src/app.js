const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const productRoutes = require('../api/routes/menu');
const orderRoutes = require('../api/routes/order')

app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/order', orderRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app listening on port ${port}`))