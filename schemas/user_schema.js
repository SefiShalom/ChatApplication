var mongoose = require('mongoose');

var User = new mongoose.Schema({
  userID: String,
  name: String,
  last_name: String,
  nickname: String,
  profile_picture: String,
  creation_date: Date,
  modification_date: Date,
  online: Boolean,
  hidden: Boolean
});

module.exports = mongoose.model('User', User);
