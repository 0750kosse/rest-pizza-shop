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
  let status = sinon.stub();
  let json = sinon.stub();
  let next = sinon.stub();
  res = { json, status, next };
  status.returns(res);



  const findAllOrdersStub = sinon.stub(Order, 'find');
  const getOrderDetailsStub = sinon.stub(Order, 'findById');

  describe('findAllOrders', () => {

    // it('should call find and return 500 if error ', async () => {

    //   const error = new Error('the error mate');
    //   findAllOrdersStub.rejects(error);
    //   res.status = sandbox.stub().throws(error)
    //   const allOrders = await findAllOrders(req, res, next).catch((e) => console.log(e));;
    //   expect(res.next).to.have.been.called;
    // })

    it.only('should call find and return 200 & json if there are orders', async () => {
      const orders = { product: "sdadas", quantity: "3" }
      findAllOrdersStub.resolves(orders)
      const allOrders = await findAllOrders(req, res, next);

      expect(findAllOrders).to.have.been.called;
      expect(res.json).to.have.been.called;


      // expect(res.status).to.have.been.called;
    })
  })
})









