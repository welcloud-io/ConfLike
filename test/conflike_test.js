const Browser = require('zombie');

var host = process.env.HOST || 'powerprez-welcloud.c9users.io';
var port = process.env.PORT || 8080;
Browser.localhost(host + ':' + port, 3001);

const program_path = '/';
const conference_title = 'Scrum pour les nuls';
const conference_schedule = '10-00';
const conference_room = 'auditorium';
const speaker_name = 'Jeff Shuterland';
const conference_id = "scrum-pour-les-nuls";
const conference_selector = "#" + conference_id;
const conference_path = "/2016/13/10-00/auditorium";
const another_conference_path = "/2016/13/10-00/salle-1";

describe('The Program', function() {
  const browser = new Browser();

  beforeEach(function(done) {
    browser.visit(program_path, done);
  });
  
  describe('Content (' + program_path + ')', function() {
    it('should load successful', function() {
      browser.assert.success();
    });
    
    it('should show conference 1 schedule', function() {
      browser.assert.text('#conference_1 #conference_schedule', conference_schedule);
    });    
    
    it('should show conference 1 room', function() {
      browser.assert.text('#conference_1 #conference_room', conference_room);
    });
    
    it('should show conference 1 link', function() {
      browser.assert.link(conference_selector, conference_title, conference_path);
    });
    
    it('should show conference 1 speaker name', function() {
      browser.assert.text('#conference_1 #speaker_name', speaker_name);
    });    
    
    it('should show the conference 1 page when link to conference 1 is clicked', function() {
        browser.clickLink(conference_selector, function() {
            browser.assert.text('#conference_title', conference_title);
        });      
    });
  });
});

var request = require('request');
function initializeDatabase(){
  request.post({
    url: "https://powerprez-welcloud.c9users.io/admin/init",
    body: "1094794743"
  }, function(error, response, body){
    //console.log(response);
  });
}

describe('A Conference', function() {
  const browser = new Browser();

  beforeEach(function(done) {
    initializeDatabase();
    browser.visit(conference_path, done);
  });

  describe('Content (' +  conference_path + ')', function() {
    it('should load successful', function() {
      browser.assert.success();
    });
    
    it('should show the conference room', function() {
      browser.assert.text('#conference_room', conference_room);
    });    
    
    it('should show the conference title', function() {
      browser.assert.text('#conference_title', conference_title);
    });
    
    it('should show the speaker name', function() {
      browser.assert.text('#speaker_name', speaker_name);
    });    

    it('should show a question', function() {
      browser.assert.text('#question', "Qu'avez vous pensé de cette conférence ?");
    });
    
    it('should show the answer panel', function() {
      browser.assert.text('#not_great', 'Pas Super');
      browser.assert.text('#so_so', 'Moyen');   
      browser.assert.text('#good', 'Bien');     
      browser.assert.text('#very_good', 'Très bien');     
    });
  });
  
  describe('Judgment (' +  conference_path + ')', function() {
    it('should judge conference as not great', function(done) {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Pas Super').then(function(){
        browser.assert.text('#counter', '-2');
      }).then(done, done);        
    }); 

    it('should judge conference conference so so', function(done) {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Moyen').then(function(){
        browser.assert.text('#counter', '-1');
      }).then(done, done);
    });    
  
    it('should judge conference conference as good', function(done) {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Bien').then(function(){
        browser.assert.text('#counter', '+1');
      }).then(done, done);      
    });    
  
    it('should judge conference as very good', function(done) {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Très bien').then(function(){
        browser.assert.text('#counter', '+2');
      }).then(done, done);        
    });
  
    it('should record judgment', function(done) {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Très bien', function(){
        browser.assert.text('#counter', '+2');
        browser.reload().then(function(){
          browser.assert.text('#counter', '+2');
        }).then(done, done);       
      });
    });
  });
});  

describe('Another Conference', function() {
  const browser = new Browser();

  beforeEach(function(done) {
    initializeDatabase();
    browser.visit(another_conference_path, done);
  });
  
  describe('Content (' + another_conference_path + ')', function() {
    it('should load successful', function() {
      browser.assert.success();
    });
  });    

  describe('Judgment (' + another_conference_path + ')', function() {
    it('should record judgment', function(done) {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Bien');
      browser.assert.text('#counter', '+1');
      browser.reload().then(function(){
        browser.assert.text('#counter', '+1');
      }).then(done, done);
    });    
  });
  
  describe('Navigation (from ' +  another_conference_path + ' to ' + conference_path  + ')', function() {
    it('should record judgment for the right page', function(done) {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Bien');
      browser.assert.text('#counter', '+1');
      browser.visit(conference_path).then(function(){
        browser.assert.text('#counter', '0');
      }).then(done, done);
    });

    it('should record judgment for the right page', function(done) {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Bien');
      browser.assert.text('#counter', '+1');
      browser.visit(conference_path).then(function(){
        browser.assert.text('#counter', '0');
      }).then(done, done);
    }); 
    
    it('should record judgment on both pages', function(done) {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Bien');
      browser.assert.text('#counter', '+1');
      browser.visit(conference_path).then(function(){
        browser.pressButton('Très bien');
        browser.assert.text('#counter', '+2');
      }).then(function(){
        browser.visit(another_conference_path).then(function(){
          browser.assert.text('#counter', '+1');
        }).then(done, done);         
      });
    });    
  });
});