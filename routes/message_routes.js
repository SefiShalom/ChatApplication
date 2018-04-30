const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const path = require("path");
const Message = require("../schemas/message_schema");

// router.get('/get-chat-messages-history',function(req,res){
//   var loginForm = req.query.conversationID;
//   Message.find({email: loginForm.email, password: loginForm.password}, function (err,user){
//     if(err || !user){
//       console.log(err);
//       return res.status(200).json({user: null, login: false});
//     }
//     return res.status(200).json({user: user, login: true});
//   });
// });


module.exports = router;
