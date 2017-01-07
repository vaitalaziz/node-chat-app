var expect = require('expect');

var {generateMessage} = require('./message');

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
