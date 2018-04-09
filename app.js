const express = require('express');
const app = express();
const socketIO = require('socket.io');
const http = require('http');
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const bodyParser = require('body-parser');
const path = require("path");

const mainRequests = require('./routes/main_routes');
const userRequests = require('./routes/user_routes');


const db = mongoose.connection;
const mongoDBURL = "mongodb://SefiShalom:XNj3d3oVdNBMfdYi@cluster0-shard-00-00-d0iqf.mongodb.net:27017,cluster0-shard-00-01-d0iqf.mongodb.net:27017,cluster0-shard-00-02-d0iqf.mongodb.net:27017/Chat?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin";
const socketProc = require('./initialSocketProcedure');

mongoose.connect(mongoDBURL);
db.on('error', console.error.bind(console, 'MongoDB connection error!\n'));

app.use('/', mainRequests);
app.use('/user', userRequests);
app.use(express.static(path.join(__dirname,'dist')));
app.use(express.static(path.join(__dirname,'src')));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

var sockets = [];

io.on('connection', function(socket){
  console.log(socket.id + " connected!");

  sockets.push({sockID: socket.id, sockObj: socket});

  socket.on('sendMessage', function(msg) {
    console.log(socket.id + ": " + msg);
    for (var i = 0; i < sockets.length; i++) {
      sockets[i].sockObj.emit('newMessage', socket.id + ": " + msg);
    }
  });



  socket.on('disconnect', function(socket){
    console.log("socket " + socket.id + " disconnected");
    sockets.splice({sockID: socket.id, sockObj: socket});
  });

  });

server.listen(3000,function () {
  console.log("Server Started!\nlistening on port 3000");
});
