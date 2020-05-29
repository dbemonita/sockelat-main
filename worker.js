const SCWorker = require('socketcluster/scworker');
const restApi = require('./rest-api');
const wsApi = require('@dbe/sockelat-ws');

class Worker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid);
    var environment = this.options.environment;

    var httpServer = this.httpServer;
    var scServer = this.scServer;

    httpServer.on('request', restApi.callback());
    httpServer.on('error', err => {
      console.log('Http server error : ', err);
    });

    scServer.on('connection', wsApi());

    scServer.on('error', err => {
      console.log('[WS Error]', err);
    })
    scServer.on('warning', err => {
      if(err){
        console.log('[WS Warning]', err.message);
      }
    })

  }
}

new Worker();