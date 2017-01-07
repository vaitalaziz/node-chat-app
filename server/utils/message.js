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

module.exports = {generateMessage};
