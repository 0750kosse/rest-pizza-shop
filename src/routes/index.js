const express = require('express')
const api = express.Router();
const menuController = require('../../controllers/menu');
const orderController = require('../../controllers/order');
const userController = require('../../controllers/user');
const checkAuth = require('../../middleware/check-auth')

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: "us-east-2",
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "pizzadominos-menu-images",
    key: (req, file, cb) => {
      console.log("key info is :", file)
      cb(null, file.originalname);
    },
  }),
});


api.get('/menu', menuController.findAllProducts);
api.get('/menu/:menuId', menuController.getOneProduct)
api.post('/menu', checkAuth, upload.single('productImage'), menuController.addProduct);
api.patch('/menu/:menuId', checkAuth, menuController.updateProduct)
api.delete('/menu/:menuId', checkAuth, menuController.deleteProduct);

api.get('/order', orderController.findAllOrders);
api.get('/order/:orderId', orderController.getOrderDetails);
api.post('/order', orderController.addOrder);
api.patch('/order/:orderId', orderController.updateOrder)
api.delete('/order/:orderId', orderController.deleteOrder)

api.get('/users', checkAuth, userController.getUsers);
api.post('/signup', userController.addUsers);
api.delete('/users/:userId', checkAuth, userController.deleteUser)

api.post('/login', userController.userLogin)

module.exports = api;


