const Browser = require('zombie');

var host = process.env.HOST || 'powerprez-welcloud.c9users.io';
var port = process.env.PORT || 8080;
Browser.localhost(host + ':' + port, 3001);

describe('AttendeePrez', function() {
  const browser = new Browser();

  beforeEach(function(done) {
    browser.visit('/', done);
  });

  describe('Conference Page', function() {
    it('should load successful', function() {
      browser.assert.success();
    });

    it('should show a question on page', function() {
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
