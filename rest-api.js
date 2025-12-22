const Koa = require('koa');
// import http from 'http'
// import config from './config'
const middlewares = require('./rest-middleware');

const app = new Koa()
// const host = process.env.HOST || '127.0.0.1'
// const port = process.env.PORT || 5000

const cors = require('@koa/cors');

app.use(cors({
  // origin: verifyOrigin,
  origin: '*',
  credentials: false,
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Access-Control-Allow-Origin', 'X-XSRF-TOKEN', 'x-requested-with'],
  allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  exposeHeaders: ['Message-Code', 'Message-Content']
}));

// Middlewares are imported here.
middlewares(app)

// app.listen(port, host)
// module.exports = app.listen(port, host)
module.exports = app;