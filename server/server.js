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

  socket.on('disconnect', () => {
    console.log('Server saying: user disconnected now');
  });
})

//app.listen(port, function(){
server.listen(port, function(){
  console.log(`Server listening on port ${port}`);
});
