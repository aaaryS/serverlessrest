const { spawn } = require('child_process');
const kill = require('tree-kill');

let slsOfflineProcess;
let dynamoDBProcess;

export const startSlsOffline = port => new Promise((resolve, reject) => {
  dynamoDBProcess = spawn('sls', ['dynamodb', 'start', '--inMemory', '--seed']);
  slsOfflineProcess = spawn('yarn', ['run', 'sls:offline', '--port', port, '--config=examples/basic/basic.config.js']);

  console.log(`Serverless: Offline started with PID : ${slsOfflineProcess.pid}`);

  const slsStart = new Promise((_resolve) => {
    slsOfflineProcess.stdout.on('data', (data) => {
      if (data.toString().includes('Serverless: Offline listening on')) {
        console.log(data.toString().trim());
        _resolve();
      }
    });
  });

  const dynamoDBStart = new Promise((_resolve) => {
    dynamoDBProcess.stdout.on('data', (data) => {
      if (data.toString().includes('Dynamodb Local Started')) {
        console.log(data.toString().trim());
        _resolve();
      }
    });
  });


  Promise.all([slsStart, dynamoDBStart]).then(() => {
    console.log('Serverless Offline Test started');
    resolve();
  });

  slsOfflineProcess.stderr.on('data', (errData) => {
    console.log(`Error starting Serverless Offline:\n${errData}`);
    reject();
  });
});

export const stopSlsOffline = () => new Promise((resolve) => {
  const killDynamoDB = new Promise(_resolve => kill(dynamoDBProcess.pid, 'SIGKILL', () => _resolve()));
  const killSls = new Promise(_resolve => kill(slsOfflineProcess.pid, 'SIGKILL', () => _resolve()));

  Promise.all([killDynamoDB, killSls]).then(() => {
    console.log('Serverless Offline Test stopped');
    resolve();
  });
});
