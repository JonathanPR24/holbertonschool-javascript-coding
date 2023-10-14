const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./7-http_express'); // Import your Express server

const { expect } = chai;

chai.use(chaiHttp);

describe('HTTP Express Server', () => {
  it('should return "Hello Holberton School!" for the root path', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Hello Holberton School!');
        done();
      });
  });

  it('should return the list of students for the /students endpoint', (done) => {
    chai.request(app)
      .get('/students')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // You can add more specific assertions here
        done();
      });
  });
});

