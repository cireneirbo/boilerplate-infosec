const express = require('express');

const app = express();

module.exports = app;
const helmet = require('helmet');
const api = require('./server.js');
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.disable("x-powered-by");
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
