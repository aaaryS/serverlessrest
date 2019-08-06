import uuid from 'uuid/v1';
import request from 'supertest';
import { startSlsOffline, stopSlsOffline } from './setup';


const slsOfflinePort = 3002;
let token = null;

describe('e2e', () => {
  beforeAll(async (done) => {
    await startSlsOffline(slsOfflinePort, 'examples/auth/auth.config.js');
    return done();
  }, 30000);

  afterAll((done) => {
    stopSlsOffline().then(() => done());
  });

  it('should get Unauthorized error', (done) => {
    request(`http://localhost:${slsOfflinePort}`)
      .post('/graphql')
      .send({ query: 'query {tasks { title } }' })
      .expect(200)
      .end((error, result) => {
        if (error) {
          console.log('error', error);
          return done(error);
        }
        expect(result.body.errors[0].message).toEqual('You are not authenticated!');
        return done();
      });
  });

  it('should create account', (done) => {
    request(`http://localhost:${slsOfflinePort}`)
      .post('/graphql')
      .send({ query: `mutation { signup(username: "test", password: "password", email: "${uuid()}@domain.com") }` })
      .expect(200)
      .end((error, result) => {
        if (error) {
          console.log('error', error);
          return done(error);
        }
        expect(result.body.data.signup).toBeDefined();
        token = result.body.data.signup;

        return done();
      });
  });

  it('should fetch list with authorization key', (done) => {
    console.log('token', token)
    request(`http://localhost:${slsOfflinePort}`)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: 'query {tasks { title } }' })
      .expect(200)
      .end((error, result) => {
        if (error) {
          console.log('error', error);
          return done(error);
        }

        expect(result.body.data.tasks).toBeDefined();

        return done();
      });
  });
});
