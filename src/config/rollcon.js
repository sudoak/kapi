var Rollbar = require('rollbar');
var rollbar = new Rollbar({
  accessToken: '4976b9b321444ca1a5f313b2f62a7ee7',
  captureUncaught: true,
  captureUnhandledRejections: true
})

module.exports = rollbar