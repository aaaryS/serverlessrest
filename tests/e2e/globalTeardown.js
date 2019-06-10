module.exports = function () {
  global.__slsOfflineProcess__.kill();
  console.log("Serverless Offline stopped");
  process.exit();
};
