import chai from 'chai'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;
const Product = require('../models/products');
import { findAllProducts, addProduct } from '../controllers/menu';

describe('Menu API', () => {
  let req, next;
  let status = sinon.stub();
  let json = sinon.spy();
  let res = { json, status }
  status.returns(res);
  const productStub = sinon.stub(Product, 'find');
  const createProductStub = sinon.stub(Product, 'create');

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

    it('should call find and log the error if other cases(rejected promise)', (done) => {
      const promise = new Promise((resolve, reject) => reject("oooops"), res);
      productStub.returns(promise);

      findAllProducts(req, res, next).then().catch(error => {
        expect(productStub).to.have.been.called;
        expect(res.status).to.have.been.called;
        expect(res.status).to.have.been.called.calledWith(404);
        expect(error).to.equal('oooops')
      }).then(done);
    })
  })

  describe('addProduct', () => {
    const product = {};
    const req = { body: { name: "name", price: "price" }, file: { path: "path" } }

    it('should not create a new product if no prod passed', () => {
      const promise = new Promise((resolve, reject) => resolve([]));
      createProductStub.returns(promise);
      addProduct(req, res, next).then(() => {
        expect(createProductStub).to.have.been.called;
        expect(res.json).to.have.been.called.calledWith({ message: 'No product added' });
        expect(res.status).to.have.been.called.calledWith(404);
      })
    })

    it('should create a new product)', (done) => {
      const promise = new Promise((resolve, reject) => resolve(product));
      createProductStub.returns(promise);

      addProduct(req, res, next).then(() => {
        expect(createProductStub).to.have.been.called;
        expect(res.json).to.have.been.called.calledWith({ message: "Product added", product });
        expect(res.status).to.have.been.called.calledWith(201)
      }).then(done)
    })

    it('should call addproduct and log the error if rejected promise', (done) => {
      const promise = new Promise((resolve, reject) => reject("somethign went wrong..."), res);
      createProductStub.returns(promise);
      addProduct(req, res, next).then().catch(error => {
        expect(res.status).to.have.been.called.calledWith(404);
        expect(error).to.equal('somethign went wrong...')
      }).then(done);

    })
  })
})





