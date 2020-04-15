const koa = require('koa');
const koaMount = require('koa-mount');
const koaStatic = require('koa-static');

// Export Koa instance as middleware function
module.exports = (path, route = '/') => {
  // Mount middleware to route
  return koaMount(route,
    // Create new koa instance
    (new koa())
    // Apply static middleware
    .use(
      // Static serve path
      koaStatic(path)
    )
  );
};