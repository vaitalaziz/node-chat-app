const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
//console.log(publicPath);

const port = process.env.PORT || 2000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//register an event e.g: connection
io.on('connection', (socket) => {
  console.log('Server saying: New user connected now');

  // sending email server to client, emit need to be under io.on
  // emit similar to listen. creating an object because allow to send many things as wish
  socket.emit('createMessage_server', {
    from: 'vaitalaziz1@gmail.com',
    text: 'From server to Hallo Aziz....',
    createAt: 111
  });

  // server receving email from client
  socket.on('createMessage_client', (msgRecvServer) =>{
    console.log('Msg Recv Server:', msgRecvServer);
  });

  // if user disconnect then server respond here
  socket.on('disconnect', () => {
    console.log('Server saying: user disconnected now');
  });

})

//app.listen(port, function(){
server.listen(port, function(){
  console.log(`Server listening on port ${port}`);
});
