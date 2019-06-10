const request = require('supertest');

describe('e2e', () => {
  it('builds mutations correctly', (done) => {

    request(`http://localhost:3004`)
      .get('/graphql')
      .expect(200)
      .end(function (error, result) {
        if (error) {
          console.log('error', error)
          return done(error);
        }

        expect(result.body.result).to.deep.eq("it works");
        done();
      });
  })
})
