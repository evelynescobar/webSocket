const express = require('express');
const WebSocket = require('ws');


var app = express();
app.set('port', (process.env.PORT || 8080));

// middlewares
app.use(express.static('public'));

var server = app.listen(app.get('port'), function () {
  console.log("Server listening...");
});

// WEBSOCKET SERVER CODE BELOW

const wss = new WebSocket.Server({ server: server });

wss.on('connection', function (wsclient) {
  wsclient.on('message', function (message) {
  
    var data = JSON.parse(message);
    console.log('received:', data);

    if (data.action == "send-message") {
      var broadcastData = {
        action: "new-message",
        message: data.message
      };
      wss.clients.forEach(function (oneClient) {
        if (oneClient !== wsclient && oneClient.readyState == WebSocket.OPEN)
        oneClient.send(JSON.stringify(broadcastData));
      });
    }
  });
});
