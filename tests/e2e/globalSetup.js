const { spawn } = require('child_process');

let slsOfflineProcess;


function startSlsOffline(port) {
  slsOfflineProcess = spawn("sls", ["offline", "start", "--port", port]);

  console.log(`Serverless: Offline started with PID : ${slsOfflineProcess.pid}`);

  slsOfflineProcess.stdout.on('data', (data) => {
    if (data.includes("Offline listening on")) {
      console.log(data.toString().trim());
      // done();
    }
  });

  slsOfflineProcess.stderr.on('data', (errData) => {
    console.log(`Error starting Serverless Offline:\n${errData}`);
    // done(errData);
  });
}


module.exports = async () => {
  console.log("[Tests Bootstrap] Start")

  global.__getSlsOfflinePort__ = 3004

  startSlsOffline(global.__getSlsOfflinePort__)

  global.__slsOfflineProcess__ = slsOfflineProcess
};
