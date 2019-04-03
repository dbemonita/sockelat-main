const SCWorker = require('socketcluster/scworker');
const {restApi, healthChecker} = require('@dbe/sockelat-rest');
const wsApi = require('@dbe/sockelat-ws');

class Worker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid);
    var environment = this.options.environment;

    var httpServer = this.httpServer;
    var scServer = this.scServer;

    healthChecker(this);
    httpServer.on('request', restApi.callback());
    httpServer.on('error', err => {
      console.log('Http server error : ', err);
    });

    scServer.on('connection', wsApi());
  }
}

new Worker();
