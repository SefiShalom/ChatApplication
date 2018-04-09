const express = require('express');
const router = express.Router();
const path = require("path");

const User = require("../schemas/user_schema");

router.get('/',function(req,res){

  User.findOne({userID: "09042018"}, function (err,user){
    if(err){
      console.log(err);
      return err;
    }

    console.log(user);

    return res.status(200).json(user);
  });
  console.log("users was called");
  // var newUser = new User({
  //   userID: "1234",
  //   name: "Sefi"
  // });
  // newUser.save();
});

module.exports = router;
