import chai from 'chai'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);
const expect = chai.expect;

import { findAllProducts } from '../src/routes/menu';
const Product = require('../src/routes/menu');

describe('Menu API', () => {
  it('should call find and return all products', () => {
    const productStub = sinon.spy(Product, 'find');

    findAllProducts();
    expect(productStub).to.have.been.called;
  })
})