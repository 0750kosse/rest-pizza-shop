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
  let findAllOrdersStub = sinon.stub(Order, 'find');
  let getOrderDetailsStub = sinon.stub(Order, 'findById');

  beforeEach(() => {
    status = sandbox.stub();
    json = sandbox.stub();
    next = sandbox.stub();
    res = { json, status, next };
    status.returns(res);
  })

  afterEach(() => {
    sandbox.restore();
  })

  describe('findAllOrders', () => {

    it('should call find and return 500 if error ', async () => {
      const error = new Error('the error mate');
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

  describe('getOrderDetails', () => {
    it('should return 500 if incorrect character length', async () => {
      const error = new Error('the error');
      getOrderDetailsStub.rejects(error);
      res.status = sandbox.stub().throws(error)
      const product = await getOrderDetails(req, res, next);
      expect(res.next).to.have.been.called;
    })
  })
})







