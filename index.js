var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var http = require('http').Server(app);

app.use(express.static('public'));

// ------------------
// PROGRAM PAGE
// ------------------
function createPage() {
  document.getElementById("page").innerHTML = navBar() +programPage();    
}
function conference_list() {
  return [
    {
      "id" : "scrum-pour-les-nuls",
      "day" : "2016/13",
      "schedule" : "10-00", 
      "room" : "auditorium", 
      "title" : "Scrum pour les nuls",
      "speaker_name" : "Jeff Shuterland"
    },
    {
      "id" : "xp-pour-les-nuls",
      "day" : "2016/13",          
      "schedule" : "10-00", 
      "room" : "salle-1", 
      "title" : "XP pour les nuls",
      "speaker_name" : "Kent Beck"
    },
    {
      "id" : "christal-clear-pour-les-nuls",
      "day" : "2016/13",          
      "schedule" : "10-00", 
      "room" : "salle-2", 
      "title" : "Christal clear pour les nuls",
      "speaker_name" : "Alistair Cockburn"
    }    
  ];
}
function navBar() {
  return `
  <nav class='navbar navbar-default'>
    <div class='container-fluid'>
    <div class='navbar-header'>
      <a class='navbar-brand' href='#'>ConfLike</a>
    </div>
  </nav>`
}
function programPage() {
  var conferences = conference_list();
  var number_of_conferences = conferences.length;      
  
  var separator = " ";
  var program_page = "";
  
  var conference_path = "";

  for (var conference_number=0; conference_number<number_of_conferences; conference_number++) {
    conference_path = "/" + conferences[conference_number].day + "/" + conferences[conference_number].schedule + "/" + conferences[conference_number].room;
    program_page += 
    "<div id='conference_" + (conference_number+1) + "'>" + 
      "<span id='conference_schedule'>"+ conferences[conference_number].schedule + "</span>" + separator +
      "<span id='conference_room'>" + conferences[conference_number].room + "</span>\n" + separator +
      "<a id='"+ conferences[conference_number].id +"' href='"+ conference_path +"'>" + conferences[conference_number].title + "</a>\n" + separator +
      "<span>par</span>\n" + separator +
      "<span id='speaker_name'>" + conferences[conference_number].speaker_name + "</span>" + separator +
    "</div>\n";
    }
  
  return  program_page;
}

app.get('/', function(req, res){
  res.send(programPage());
});

// ------------------
// CONFERENCE PAGE
// ------------------

var jugements;

app.get('/2016/13/10-00/auditorium', function(req, res){
  res.sendFile(__dirname + '/2016/13/10-00/auditorium/index.html');
});

app.get('/2016/13/10-00/salle-1', function(req, res){
  res.sendFile(__dirname + '/2016/13/10-00/salle-1/index.html');
});

app.get('/2016/13/10-00/auditorium/jugement', function(req, res){
  var result=jugements['/2016/13/10-00/auditorium/jugement'];
  if (result == undefined) { result='0'; }
  res.send(result);
});

app.post('/2016/13/10-00/auditorium/jugement', function(req, res){
  jugements["/2016/13/10-00/auditorium/jugement"]=req.body.jugement;
  res.send("");
});

app.get('/2016/13/10-00/salle-1/jugement', function(req, res){
  var result=jugements['/2016/13/10-00/salle-1/jugement'];
  if (result == undefined) { result='0'; }
  res.send(result);
});

app.post('/2016/13/10-00/salle-1/jugement', function(req, res){
  jugements["/2016/13/10-00/salle-1/jugement"]=req.body.jugement; 
  res.send("");
});

app.post('/admin/init', function(req, res){
  jugements={};
  res.send("");
});

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

http.listen(port, function () {
  console.log('ConfLike listening on port', host + ":" + port);
});