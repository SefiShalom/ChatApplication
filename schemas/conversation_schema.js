var mongoose = require('mongoose');

var Chat = new mongoose.Schema({
  _id: String,
  type: String,
  creationDate: Date,
  lastActiveDate: Date,
  hidden: Boolean,
  title: String,
});

module.exports = mongoose.model('Chat', Chat);
