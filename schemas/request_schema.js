var mongoose = require('mongoose');

var Request = new mongoose.Schema({
  subject_id: {type: String, required: true},
  requester_id: {type: String, required: true},
  status: {type: String, default: 'pending'}
});

module.exports = mongoose.model('Request', Request);
