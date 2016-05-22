const Browser = require('zombie');

var host = process.env.HOST || 'powerprez-welcloud.c9users.io';
var port = process.env.PORT || 8080;
Browser.localhost(host + ':' + port, 3001);

const conference_title = 'Scrum pour les nuls'
const conference_schedule = '10:00'
const conference_room = 'Auditorium'
const speaker_name = 'Jeff Shuterland'
const conference_selector = "#scrum-pour-les-nuls"
const conference_path = "/scrum-pour-les-nuls"

describe('Program', function() {
  const browser = new Browser();

  beforeEach(function(done) {
    browser.visit('/', done);
  });
  
  describe('Program Page', function() {
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


describe('Conference', function() {
  const browser = new Browser();

  beforeEach(function(done) {
    browser.visit(conference_path, done);
  });

  describe('Conference Page', function() {
    it('should load successful', function() {
      browser.assert.success();
    });
    
    it('should show the conference title', function() {
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
  
  describe('Attendee find the conference is not great', function() {
    it('should mark conference as not great', function() {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Pas Super');
      browser.assert.text('#counter', '-2');      
    }); 
  });
  
  describe('Attendee find the conference is so so', function() {
    it('should mark teacher conference as Disliked when NO pressed', function() {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Moyen');
      browser.assert.text('#counter', '-1');      
    });    
  }); 
  
  describe('Attendee find the conference is good', function() {
    it('should mark teacher conference as Disliked when NO pressed', function() {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Bien');
      browser.assert.text('#counter', '+1');      
    });    
  });
  
  describe('Attendee find the conference is very good', function() {
    it('should mark teacher conference as Disliked when NO pressed', function() {
      browser.assert.text('#counter', '0');      
      browser.pressButton('Très bien');
      browser.assert.text('#counter', '+2');      
    });    
  });  
});
