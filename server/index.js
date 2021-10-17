'use strict';

const globSync = require('glob').sync;
const isDisabled = require('ember-cli-testem-http-mocks/lib/is-disabled');

// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };
function setupMocks(app) {
  if (isDisabled()) {
    return;
  }

  const mocks = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);

  mocks.forEach(function (route) {
    route(app);
  });
}

module.exports = function (app) {
  const proxies = globSync('./proxies/**/*.js', { cwd: __dirname }).map(
    require
  );

  // Log proxy requests
  const morgan = require('morgan');
  app.use(morgan('dev'));

  setupMocks(app);
  proxies.forEach(function (route) {
    route(app);
  });
};

module.exports.setupMocks = setupMocks;
