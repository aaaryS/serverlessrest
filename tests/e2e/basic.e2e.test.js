const request = require('supertest');
const { spawn } = require('child_process');
const kill = require('tree-kill');

let slsOfflineProcess;

//TO-DO refactor to new file

const startSlsOffline = (port, dynamoDBPort) => new Promise((resolve, reject) => {
  slsOfflineProcess = spawn('yarn', ['run', "sls:offline", "--port", port, "--config=examples/basic/basic.config.js"]);
  // dynamoDBProcess = spawn("sls", ["dynamodb", "start", "--inMemory"]);
  // slsOfflineProcess = spawn("sls", ["offline", "start", "-P", port, "--", "--config='examples/basic/basic.config.js'"]);

  console.log(`Serverless: Offline started with PID : ${slsOfflineProcess.pid}`);

  slsOfflineProcess.stdout.on('data', (data) => {
    if (data.includes("Offline listening on")) {
      console.log(data.toString().trim());
      // done();
      resolve();
    }
  });

  // dynamoDBProcess.stdout.on('data', (data) => {
  //   console.log(data.toString().trim());
  // });

  slsOfflineProcess.stderr.on('data', (errData) => {
    console.log(`Error starting Serverless Offline:\n${errData}`);
    // done(errData);
    reject();
  });

  // dynamoDBProcess.stderr.on('data', (errData) => {
  //   console.log(`Error starting dynamoDBProcess:\n${errData}`);
  //   // done(errData);
  //   reject();
  // });
});

const stopSlsOffline = () => new Promise((resolve) => {
  kill(slsOfflineProcess.pid, 'SIGKILL', () => {
    console.log("Serverless Offline stopped");
    // process.exit(1);
    resolve()
  });
})

describe('e2e', () => {
  beforeAll(() => {
    global.__getSlsOfflinePort__ = 3001

    return startSlsOffline(global.__getSlsOfflinePort__)
  });

  afterAll(() => {
    // slsOfflineProcess.kill('SIGINT');
    // kill(slsOfflineProcess.pid, 'SIGKILL', () => {
    //   console.log("Serverless Offline stopped");
    //   process.exit();
    // });
    // dynamoDBProcess.kill();
    // console.log("Serverless Offline stopped");
    // process.exit();
    console.log('AFTER ALL')
    return stopSlsOffline()
  });

  it('builds mutations correctly', (done) => {
    console.log('global.__getSlsOfflinePort__ ', global.__getSlsOfflinePort__ )
    request(`http://localhost:3001`)
      .post('/graphql')
      .send({ "query": "{ tasks { id } }"})
      .expect(200)
      .end(function (error, result) {
        if (error) {
          console.log('error', error)
          return done(error);
        }
        // expect(result.body.result).to.deep.eq("it works");
        done();
      });
  })
})
