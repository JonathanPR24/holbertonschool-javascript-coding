const { expect } = require('chai');
const http = require('http');
const app = require('./4-http');

describe('HTTP Server', () => {
  let server;

  before((done) => {
    server = http.createServer(app);
    server.listen(1245, () => {
      done();
    });
  });

  after(() => {
    server.close();
  });

  it('should respond with "Hello Holberton School!" for /', (done) => {
    http.get('http://localhost:1245', (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        expect(response.statusCode).to.equal(200);
        expect(data).to.equal('Hello Holberton School!\n');
        done();
      });
    });
  });
});
