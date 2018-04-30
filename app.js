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
const Conversation = require('./schemas/conversation_schema');
const Message = require('./schemas/message_schema');
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

var pendingClients = new HashMap();

var clients = new HashMap();


io.on('connection', function (socket) {

  console.log(socket.id + " connected!");

  var socketID = socket.id;

  pendingClients.set(socketID, socket);


  socket.on('registerClientToClients', function(user){
    console.log('USER: ');
    console.log(user);
    var id = new mongoose.Types.ObjectId(user._id);
      User.update({_id: id}, {socketID: socketID, online: true}, function(err){
        if(err){
          console.log(err);
          return;
        }else{
          console.log('registering client socket: ' + socketID);
          var clientSock = pendingClients.get(socketID);
          clients.set(user._id,clientSock);
          socket.emit('clientRegistrationResponse',{isRegistered: true, socketID: socketID});
          //TODO emit connection to online friends
        }
      });
  });


  socket.on('getConversation',function(users){

    // var user1 = new mongoose.Types.ObjectId(users.user1);
    // var user2 = new mongoose.Types.ObjectId(users.user2);

    Message.find({$or: [
      {$and: [{receiverID: users.user2}, {senderID: users.user1}]},
        {$and: [{receiverID: users.user1}, {senderID: users.user2}]}]},function (err,messages) {
        if(err){
          console.log(err);
        }else if(messages.length === []){
          socket.emit('receiveConversation',null);
        }else{
          socket.emit('receiveConversation',messages);
        }
    });
  });


  socket.on('sendMessage', function (messageObject) {

    console.log(messageObject);

    var message = new Message({
      conversationID: messageObject.conversationID,
      senderID: messageObject.senderID,
      receiverID: messageObject.receiverID,
      content: messageObject.content
    });

    // if(!message.conversationID){
    //   console.log('no conv id');
    //   var conversation = new Conversation({
    //     users: [message.senderID, message.receiverID],
    //   });
    //
    //   conversation.save(function(err, conv){
    //     if(err){
    //       console.log(err);
    //     }else{
    //       message.conversationID = conv._id;
    //     }
    //   });
    // }

    message.save(function(err){
      console.log('saving message');
      if(err){
        console.log(err);
      }else{
        // sends the message to the client.
        console.log(messageObject.senderID + ": " + messageObject.content);
        var receiver = clients.get(messageObject.receiverID);
        if(receiver){
          receiver.emit('newMessage',messageObject);
        }
      }
    });

  });

  socket.on('disconnect', function () {
    console.log(socket.id + " was disconnected!");
    clients.delete(socket.id);
  });
});

server.listen(3000, function () {
  console.log("Server Started!\nlistening on port 3000");
});
