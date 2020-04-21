import chai from 'chai'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;
const Product = require('../models/products');
import { findAllProducts } from '../controllers/menu';

describe('Menu API', () => {
  let req, next;
  let status = sinon.stub();
  let json = sinon.spy();
  let res = { json, status }
  status.returns(res);
  const productStub = sinon.stub(Product, 'find');

  describe('findAllProducts', () => {
    it('should call find and return 404/not found message if no products', (done) => {
      const promise = new Promise((resolve, reject) => resolve([]));
      productStub.returns(promise);

      findAllProducts(req, res, next).then(() => {
        expect(productStub).to.have.been.called;
        expect(res.status).to.have.been.called;
        expect(res.json).to.have.been.called.calledWith({ message: 'No items found' });
        expect(res.status).to.have.been.called.calledWith(404);
      }).then(done);;
    })

    it('should call find and return 200/there are items if products', (done) => {
      const product = [{ name: "pizza", price: "3" }, { name: "lemon", price: "4" }]
      const promise = new Promise((resolve, reject) => resolve(product));
      productStub.returns(promise);

      findAllProducts(req, res, next).then(() => {
        expect(productStub).to.have.been.called;
        expect(res.status).to.have.been.called;
        expect(res.json).to.have.been.called.calledWith({ message: "one product", product });
        expect(res.status).to.have.been.called.calledWith(200);
      }).then(done);
    })

    it.only('should call find and return 500 if other cases', (done) => {
      const promise = new Promise((resolve, reject) => reject("oooops"), 500);
      productStub.returns(promise);

      findAllProducts(req, res, next).then(() => {
        expect(productStub).to.have.been.called;
        expect(res.status).to.have.been.called;
        expect(res.status).to.have.been.called.calledWith(500);
      })
        .catch(error => { error })
        .then(done);
    })
  })
})

