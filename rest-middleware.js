const favicon = require('koa-favicon')
const bodyParser = require('koa-body')
const staticServe = require('./static')
const mount = require('koa-mount')
const restHmi = require('@dbe/rest-hmi')
const restAdmin = require('@dbe/rest-admin')
const jsonWebToken = require('jsonwebtoken');

module.exports = (app) => {
  // Catch and format the error in the upstream.
  // https://github.com/koajs/koa/wiki/Error-Handling
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  });

  app.on('error', (err, ctx) => {
    console.log('[main error] ', err);
    /* centralized error handling:
     *   console.log error
     *   write error to log file
     *   save error and request information to database if ctx.request match condition
     *   ...
    */
  });

  // Static files are files that clients download as they are from the server.
  // Create a new directory, public. Koa, by default doesn't allow you to
  // serve static files.
  app.use(staticServe('public'));
  app.use(staticServe('drive'));
  //  Add favicon.
  app.use(favicon('public/favicon.ico'))

  app.use(bodyParser({multipart: true}))

  // Add routes by group.
  app.use(function (ctx, next) {
    if(ctx.header.authorization){
      let token = ctx.header.authorization.slice(7);
      var decoded = jsonWebToken.decode(token);
      
      ctx.state.user = decoded;
    }
  
    return next();
  });

  app.use(mount(restHmi))
  app.use(mount(restAdmin))
}