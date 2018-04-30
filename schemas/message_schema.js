var mongoose = require('mongoose');

var Message = new mongoose.Schema({
  conversationID: String,
  senderID: {type: String, required: true},
  receiverID: {type: String, required: true},
  date: {type: Date, default: Date.now()},
  read: {type: Boolean, default: false},
  hidden: Boolean,
  content: String
});

module.exports = mongoose.model('Message', Message);
