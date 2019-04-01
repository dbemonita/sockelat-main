const SCWorker = require('socketcluster/scworker');
const serveStatic = require('serve-static');
const path = require('path');
const morgan = require('morgan');
const healthChecker = require('sc-framework-health-check');
const restApi = require('rest-api');
const wsApi = require('ws-api');

class Worker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid);
    var environment = this.options.environment;

    var httpServer = this.httpServer;
    var scServer = this.scServer;

    // app.use(serveStatic(path.resolve(__dirname, 'public')));
    // healthChecker.attach(this, app);

    httpServer.on('request', restApi.callback());
    httpServer.on('error', err => {
      console.log('Http server error : ', err);
    });

    scServer.on('connection', wsApi());
  }
}

new Worker();
