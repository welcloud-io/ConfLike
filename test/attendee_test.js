const Browser = require('zombie');

Browser.localhost('powerprez-welcloud.c9users.io:8080', 3001);

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
      browser.assert.hasClass('#page_1','visible');
      browser.assert.text('#page_1', 'Avez vous aimer cette conférence ?');
    });
    
    it('should show a YES and a NO button on page', function() {
      browser.assert.text('#oui', 'OUI');
      browser.assert.text('#non', 'NON');     
    });
  });
  
  describe('Attendee Like Conference', function() {
    it('should mark teacher conference as liked when YES pressed', function() {
      browser.assert.text('#counter', '0');      
      browser.pressButton('OUI');
      browser.assert.text('#counter', '1');      
    }); 
  });
  
  describe('Attendee Dislike Conference', function() {
    it('should mark teacher conference as Disliked when YES pressed', function() {
      browser.assert.text('#counter', '0');      
      browser.pressButton('NON');
      browser.assert.text('#counter', '-1');      
    });    
  });  
});
