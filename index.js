var express = require('express');
var app = express();

var http = require('http').Server(app);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/attendee.html');
});

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

http.listen(port, function () {
  console.log('ConfLike listening on port', host + ":" + port);
});