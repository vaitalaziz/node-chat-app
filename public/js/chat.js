var socket = io(); // initialing request from client

function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');// last list iteam, means after the iteam needs scrolling
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight(); // it counts height of the msg & padding also applied in css.
  var lastMessageHeight = newMessage.prev().innerHeight();// 2nd last list iteam


  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    //console.log('Scroll down it');
    messages.scrollTop(scrollHeight);
  }
}

// wanna listen on event, 1st agru is event name then call back func
socket.on('connect', function() {
    //console.log('From client saying: Connected to server');

    //
    var params = jQuery.deparam(window.location.search);
    // certain people can emits & listens by "socket.io join"
    socket.emit('join', params, function (err) {
      if (err) {
        alert(err);
        window.location.href = '/';
      } else {
        console.log('Alles gut!');
        //who else join in chat room to know

      }
    });

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

socket.on('updateUserList', function(users) {
  //console.log('Users List:: ', users);
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol); 
});

// receving message from server by client
socket.on('createMessage_server', function(msgRcvClient){
  // //console.log('Msg Rcv Client: ', msgRcvClient);
  // var formattedTime = moment(msgRcvClient.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${msgRcvClient.from} ${formattedTime}: ${msgRcvClient.text}`);
  //
  // jQuery('#messages').append(li);

  // above code was fine but commented for mustache implement testing
  var formattedTime = moment(msgRcvClient.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: msgRcvClient.text,
    from: msgRcvClient.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

});

  socket.on('newLocation_server', function(msgRcvClient) {
    // var formattedTime = moment(msgRcvClient.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    //
    // li.text(`${msgRcvClient.from} ${formattedTime}: `);
    // a.attr('href', msgRcvClient.url);
    // li.append(a);
    // jQuery('#messages').append(li);

    var formattedTime = moment(msgRcvClient.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
      from: msgRcvClient.from,
      createdAt: formattedTime,
      url: msgRcvClient.url
    });

    jQuery('#messages').append(html);
    scrollToBottom();
  });


// socket.emit('createMessage_client', {
//   from: 'Apon Aziz', //
//   text: 'hi' //
// }, function(data) { // function callback for acknowledgement ,, data receving value from server
//   console.log('Client says Informed!', data); //
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault(); // prevent the default behavior

  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage_client', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
        messageTextBox.val("");
  });
});


//location sending
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by ur browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled').text('Send location');
      //console.log(position);
      //new event 'creatgeLocationClient' registration
      socket.emit('creategeoLocationClient', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
