import chai from 'chai'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);
const sandbox = require('sinon').createSandbox();
const expect = chai.expect;
const Order = require('../models/orders');
import { findAllOrders, addOrder, getOrderDetails, updateOrder, deleteOrder } from '../controllers/order';

describe.only('Order API', () => {
  let req, res;
  let status;
  let json;
  let next;
  let body;
  let findAllOrdersStub = sinon.stub(Order, 'find');
  let addOrderStub = sinon.stub(Order, 'create');
  let getOrderDetailsStub = sinon.stub(Order, 'findById');
  let updateOrderStub = sinon.stub(Order, 'findByIdAndUpdate');
  let deletedOrderStub = sinon.stub(Order, 'findByIdAndRemove');
  const error = new Error('Something went wrong');

  beforeEach(() => {
    status = sandbox.stub();
    json = sandbox.stub();
    next = sandbox.stub();
    body = sandbox.stub();
    res = { json, status, next };
    req = { body };
    status.returns(res);
  })

  afterEach(() => {
    sandbox.restore();
  })

  describe('findAllOrders', () => {

    it('should call find and return 500 if error ', async () => {
      res.status = sandbox.stub().throws(error);
      const allOrders = await findAllOrders(req, res, next);
      expect(res.next).to.have.been.called;
    })

    it('should call find and return 404 if orders is empty', async () => {
      let orders = [];
      let count = orders.length;
      let message;

      findAllOrdersStub.returns({ populate: sinon.stub().returns(count, orders, message) });
      const allOrders = await findAllOrders(req, res, next);
      expect(findAllOrdersStub).to.have.been.called;
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "No orders yet" });
    })

    it('should call find and return 200 & json if there are orders', async () => {
      let orders = [{ name: "pizza", price: "3" }];
      let count = orders.length;;
      let message;

      findAllOrdersStub.returns({ populate: sinon.stub().returns(orders, count, message) });
      const allOrders = await findAllOrders(req, res, next);
      expect(findAllOrdersStub).to.have.been.called;
      expect(res.json).to.have.been.calledWith({ orders, count, message: "Here are the orders" });
      expect(res.status).to.have.been.calledWith(200);
    })
  })

  describe('addOrder', () => {
    it('should return 500 if error creating order', async () => {
      addOrderStub.rejects(error);
      const addedOrder = await addOrder(req, res, next);
      expect(res.next).to.have.been.called;
    })

    it('should return 404 & message if no orders have been posted', async () => {
      let message;

      addOrderStub.returns(message);
      const addingOrders = await addOrder(req, res, next);
      expect(addOrderStub).to.have.been.called;
      expect(res.json).to.have.been.called.calledWith({ message: "No product ordered yet" });
      expect(res.status).to.have.been.called.calledWith(404);
    })

    it('should return 201 & order details if order has been posted', async () => {
      let userOrder = { product: "Product id", quantity: "3" };
      let message;
      addOrderStub.returns(userOrder, message);
      const addingOrders = await addOrder(req, res, next);
      expect(addOrderStub).to.have.been.called;
      expect(res.json).to.have.been.called.calledWith({ userOrder });
      expect(res.status).to.have.been.called.calledWith(201);
    })
  })

  describe('getOrderDetails', () => {
    it('should return 500 if incorrect character length', async () => {
      //note : does not matter who throws the expected error( lines 85-86)
      getOrderDetailsStub.rejects(error);
      res.status = sandbox.stub().throws(error)
      const product = await getOrderDetails(req, res, next);
      expect(res.next).to.have.been.called;
    })
  })

  describe('deleteOrder', () => {
    it('should return 500 if error deleting order', async () => {
      res.status = sandbox.stub().throws(error);
      const deletedOrder = await deleteOrder(req, res, next);
      expect(res.next).to.have.been.called;
    })
    it('should return 404 if ID is not a match', async () => {

    })
    it('should return 200 & delete the property with such ID', async () => {

    })
  })
})







