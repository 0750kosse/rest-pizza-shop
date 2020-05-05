import chai from 'chai'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);
const expect = chai.expect;
const Product = require('../../models/products');
const Order = require('../../models/orders');
const User = require('../../models/users');

describe('Mongoose models', () => {

  describe('Product model', () => {
    it('exists', () => {
      expect(Product.model).to.exist;
    });
    it('db collection name is products', () => {
      expect(Product.collection.name).to.equal('products')
    });
    it('Product has a property called name', () => {
      expect(Product.model).to.have.property('name');
    });
  })


  describe('Order model ', () => {
    const testOrder = new Order({
      product: '_id',
      quantity: 'quantity',
    })

    it('exists ', () => {
      expect(Order.model).to.exist;
    })
    it('db collection name is orders', () => {
      expect(Order.collection.name).to.equal('orders');
    })

    it('has a property called id', () => {
      expect(testOrder).to.have.property('_id');
    })

    it('has a property called quantity', () => {
      expect(testOrder).to.have.property('quantity');
    })
  });


  describe('User model', () => {
    const testUser = new User({
      email: 'email',
      password: 'password'
    })
    it('exists', () => {
      expect(User.model).to.exist;
    })
    it('db collection name is users', () => {
      expect(User.collection.name).to.equal('users');
    })
    it('has a property called email', () => {
      expect(testUser).to.have.property('email');
    })
    it('has a property called password', () => {
      expect(testUser).to.have.property('password');
    })
    it('has a property called price', () => {
      expect(testUser).to.not.have.property('price');
    })
  })
})

