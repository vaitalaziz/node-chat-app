var socket = io(); // initialing request from client

// wanna listen on event, 1st agru is event name then call back func
socket.on('connect', function() {
  console.log('From client saying: Connected to server');

  // emit need to be under connect
  // client sending message to server
        // socket.emit('createMessage_client', {
        //   from: 'Aziz',
        //   text: 'Hey. This Aziz.. from index js'
        // });
      });

socket.on('disconnect', function() {
  console.log('From client saying: Disconnected server!!');
});

// receving message from server by client
socket.on('createMessage_server', function(msgRcvClient){
  console.log('Msg Rcv Client: ', msgRcvClient);
  var li = jQuery('<li></li>');
  li.text(`${msgRcvClient.from}: ${msgRcvClient.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage_client', {
//   from: 'Apon Aziz', //
//   text: 'hi' //
// }, function(data) { // function callback for acknowledgement ,, data receving value from server
//   console.log('Client says Informed!', data); //
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault(); // prevent the default behavior

  socket.emit('createMessage_client', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
