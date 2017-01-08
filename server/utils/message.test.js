var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Aziz';
    var text = 'Say something....';
    var message = generateMessage(from, text);

    //expect(message.from).toBe(from);
    expect(message).toInclude({from, text}); // from : from, text : text
    expect(message.createAt).toBeA('number');
  });
});

describe('Location_Message', () => {
  it('Should generate correct location object', () => {
    var from = 'Apon Aziz';
    var latitude = 11;
    var longitude = 5;
    var url = 'https://www.google.com/maps?q=11,5';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message).toInclude({from, url});
  });
});
