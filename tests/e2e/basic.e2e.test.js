import request from 'supertest';
import { startSlsOffline, stopSlsOffline } from './setup';

const slsOfflinePort = 3001;

describe('e2e', () => {
  beforeAll(async (done) => {
    await startSlsOffline(slsOfflinePort);
    return done();
  }, 30000);

  afterAll((done) => {
    stopSlsOffline().then(() => done());
  });

  it('creates task properly', (done) => {
    request(`http://localhost:${slsOfflinePort}`)
      .post('/graphql')
      .send({ query: 'mutation {createTask (title: "ABC-postman", description:"Test") { id, title } }' })
      .expect(200)
      .end((error, result) => {
        if (error) {
          console.log('error', error);
          return done(error);
        }
        expect(result.body.data.createTask.title).toEqual('ABC-postman');
        return done();
      });
  });

  it('fetches tasks properly', (done) => {
    request(`http://localhost:${slsOfflinePort}`)
      .post('/graphql')
      .send({ query: 'query {tasks { title } }' })
      .expect(200)
      .end((error, result) => {
        if (error) {
          console.log('error', error);
          return done(error);
        }
        expect(result.body.data.tasks.length).toBeGreaterThan(0);
        expect(result.body.data.tasks).toContainEqual({ title: 'ABC-postman' });
        return done();
      });
  });
});
