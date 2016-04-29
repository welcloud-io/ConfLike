var express = require('express');
var app = express();

var http = require('http').Server(app);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/attendee.html');
});

var port = process.env.PORT || 8080;
http.listen(port, function () {
  console.log('Example app listening on port', "0.0.0.0" + ":" + port);
});