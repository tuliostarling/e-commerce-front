const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express();
const helmet = require('helmet');

//Certificate info
const credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/tutuguerra.com.br/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/tutuguerra.com.br/fullchain.pem')
};

app.use(helmet());
app.use(express.static('public'));

app.use('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

https.createServer(credentials, app).listen(443, () => {
  console.log('Server up!')
});

