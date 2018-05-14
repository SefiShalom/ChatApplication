const mongoose = require('mongoose');

const FriendRequest = new mongoose.Schema({
  requester_id: {type: String, require: true},
  receiver_id: {type: String, require: true},
  date: {type: Date, default: Date.now()},
  message: {type: String, default: 'Hi, lets chat!'}
});

module.exports = mongoose.model(FriendRequest,'FriendRequest');
