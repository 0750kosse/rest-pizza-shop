import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

describe.only('/GET products', () => {

  it('it should GET all the products', (done) => {
    chai.request('http://localhost:3050')
      .get('/api/menu')
      .then((res) => {
        expect(res).to.have.status(200);
      })
    done()
  });
});

