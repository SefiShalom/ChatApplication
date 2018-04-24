const express = require('express');
const app = express();
const socketIO = require('socket.io');
const http = require('http');
const mongoose = require("mongoose");
autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = require("bluebird");
const bodyParser = require('body-parser');
const path = require("path");
const mainRequests = require('./routes/main_routes');
const userRequests = require('./routes/user_routes');
const loginRequests = require('./routes/login_routes');
const User = require("./schemas/user_schema");
const HashMap = require('hashmap');

const db = mongoose.connection;
const mongoDBURL = "mongodb://SefiShalom:XNj3d3oVdNBMfdYi@cluster0-shard-00-00-d0iqf.mongodb.net:27017,cluster0-shard-00-01-d0iqf.mongodb.net:27017,cluster0-shard-00-02-d0iqf.mongodb.net:27017/Chat?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin";
const socketProc = require('./initialSocketProcedure');

mongoose.connect(mongoDBURL);
db.on('error', console.error.bind(console, 'MongoDB connection error!\n'));

app.use('/', mainRequests);
app.use('/user', userRequests);
app.use('/login', loginRequests);
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
var clients = new HashMap();


io.on('connection', function (socket) {
  console.log(socket.id + " connected!");
  var socketID = socket.id;
  clients.set(socketID, socket);

  socket.on('sendMessage', function (messageObject) {
    console.log(messageObject.senderID + ": " + messageObject.content);
    // clients.forEach(function (client) {
    //   client.emit('newMessage', messageObject.content);
    // });
    clients.get(messageObject.receiverID).emit('newMessage',messageObject.content);
  });

  socket.on('getSocketID', function (user) {
    console.log('getting socket ID from socket.io for id ' + user.id);
    User.update({userID: user.id},{currentSocketID: socketID}, function(err){
      if(err){
        console.log(error);
      }
    });
    clients.get(socketID).emit('receiveSocketID', socketID);
  });

  socket.on('disconnect', function () {
    console.log(socket.id + " was disconnected!");
    clients.delete(socket.id);
  });
});

server.listen(3000, function () {
  console.log("Server Started!\nlistening on port 3000");
});
