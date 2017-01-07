var socket = io(); // initialing request from client

// wanna listen on event, 1st agru is event name then call back func
socket.on('connect', function() {
  console.log('From client saying: Connected to server');

  // emit need to be under connect
  // client sending email to server
        // socket.emit('createMessage_client', {
        //   from: 'Andrew',
        //   text: 'Hey. This Andrew.. from index js'
        // });
      });

socket.on('disconnect', function() {
  console.log('From client saying: Disconnected server!!');
});

// receving email from server by client
socket.on('createMessage_server', function(msgRcvClient){
  console.log('Msg Rcv Client: ', msgRcvClient);
});
