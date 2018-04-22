const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const path = require("path");
const User = require("../schemas/user_schema");

router.post('/',function(req,res){
  var loginForm = req.body;
  User.findOne({email: loginForm.email, password: loginForm.password}, function (err,user){
    if(err || user === {}){
      console.log(err);
      return res.status(200).json({user: null, login: false});
    }
    return res.status(200).json({user: user, login: true});
  });
});

router.post('/register',function(req,res){

  var registrationForm = req.body;
  console.log(registrationForm);
  var newUser = new User(registrationForm);
  newUser.save(function(err,user){

    if(err){
      console.log(err);
      return res.status(500).send("Problem in registration");
    }else{
      return res.status(200).json(user);
    }
  });
});


module.exports = router;
