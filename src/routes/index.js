const express = require('express')
const api = express.Router();
const menuController = require('../../controllers/menu');
const orderController = require('../../controllers/order');
const userController = require('../../controllers/user');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
});
const upload = multer({ storage: storage })

api.get('/menu', menuController.findAllProducts);
api.get('/menu' + ':menuId', menuController.getOneProduct)
api.post('/menu', upload.single('productImage'), menuController.addProduct);
api.patch('/menu' + ':menuId', menuController.updateProduct)
api.delete('/menu' + ':menuId', menuController.deleteProduct);


api.get('/order', orderController.findAllOrders);
api.get('/order' + ':orderId', orderController.getOrderDetails);
api.post('/order', orderController.addOrder);
api.patch('/order' + ':orderId', orderController.updateOrder)
api.delete('/order' + ':orderId', orderController.deleteOrder)

api.get('/users', userController.getUsers);
api.post('/signup', userController.addUsers);
api.delete('/users' + ':userId', userController.deleteUser)

api.post('/login', userController.userLogin)


module.exports = api;