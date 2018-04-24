var mongoose = require('mongoose');


var User = new mongoose.Schema({
  userID: {type: String, default: "09042018"}, //make autoincrement
  name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  nickname: {type: String, required: true},
  currentSocketID: {type: String, default: ""},
  profile_picture: {type: String, default: "https://i.stack.imgur.com/l60Hf.png"},
  friends: {type: Array, default: []},
  creation_date: {type: Date, default: Date.now},
  modification_date: {type: Date, default: Date.now},
  online: {type: Boolean, default: false},
  hidden: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', User);
