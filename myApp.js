const express = require('express');

const app = express();

module.exports = app;
const helmet = require('helmet');
const api = require('./server.js');
const timeInSeconds = 90*24*60*60;
app.use(
  helmet({
    frameguard: {
      action: 'deny',
    },
    hsts: {
      maxAge: timeInSeconds,
      force: true,
    },
    dnsPrefetchControl: {
      allow: false,
    },
    noCache: true,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", 'trusted-cdn.com'],
      },
    },
  })
);
app.use(express.static('public'));
app.use('/_api', api);
app.disable("x-powered-by");
app.disable('strict-transport-security');
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
