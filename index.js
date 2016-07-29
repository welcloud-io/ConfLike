var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var http = require('http').Server(app);

app.use(express.static('public'));

var jugement='0';

app.get('/2016/*', function(req, res){
  res.sendFile(__dirname + '/scrum-pour-les-nuls.html');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/program.html');
});

app.post('/admin/init', function(req, res){
  jugement='0';  
  res.send("");
});

app.get('/jugement', function(req, res){
  res.send(jugement);
});

app.post('/jugement', function(req, res){
  jugement=req.body.jugement;
  res.send("");
});

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

http.listen(port, function () {
  console.log('ConfLike listening on port', host + ":" + port);
});