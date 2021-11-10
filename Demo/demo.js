const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
var chatData = require('./models/userData')
var connect = require("./dbconnection")
const io = new Server(server);



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/demo.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});



io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    
    connect.then(db  =>  {
      console.log("connected correctly to the server");
      console.log(msg);
      io.emit('chat message', msg);
      let  chatMessage  =  new chatData({ message: msg});
    chatMessage.save();
    });
  });

  
  //   const inputData = {
  //     message : msg
  //   }
  //   var data = chatData(inputData)
  //   data.save(function (err) {
  //     if (err) {
  //       console.log("Error in Insert Record  " + err);
  //     } else {
  //       console.log("Data Saved")
  //     }
  //   })
  //   console.log('message: ' + msg);
  // });
});

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });



server.listen(9000, () => {
  console.log('listening on *:9000');
});