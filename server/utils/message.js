// socket.emit('createMessage_server', {
//         //   from: 'mike@example.com',
//         //   text: 'From server to Hallo Aziz....',
//
//         // });

//above function customized as below::

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createAt: new Date().getTime()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createAt: new Date().getTime()
  };
};

module.exports = {generateMessage, generateLocationMessage};
