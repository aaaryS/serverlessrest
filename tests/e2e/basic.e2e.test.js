import request from 'supertest';
import { startSlsOffline, stopSlsOffline } from './setup';

describe('e2e', () => {
  beforeAll(async (done) => {
    global.__getSlsOfflinePort__ = 3001;

    await startSlsOffline(global.__getSlsOfflinePort__);
    return done();
  }, 30000);

  afterAll((done) => {
    stopSlsOffline().then(() => done());
  });

  it('creates task properly', (done) => {
    request(`http://localhost:${global.__getSlsOfflinePort__}`)
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
});
