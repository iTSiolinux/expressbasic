// index.js
const express = require('express'),
  expressWs = require('express-ws'),
  { Packet, ServerSocket } = require('./server/ServerSocket.js'),
  APP = express(),
  PORT = 5000;

expressWs(APP);
APP.use('', express.static('client/backend'));

APP.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/backend/HTML/index.html');
});

const exampleWebSocket = new ServerSocket('domain', APP);
exampleWebSocket.on('eventName', (data) => {
  console.log('something working, data recived: \n', data);
});

APP.listen(PORT, () => {
  console.log(`Basic app listening at http://localhost:${PORT}`);
});
