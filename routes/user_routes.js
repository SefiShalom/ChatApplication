const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const mongoose = require('mongoose');
const path = require("path");
const User = require("../schemas/user_schema");

router.get('/',function(req,res){

  var userid = req.query.userid;
  // var userID = 'ObjectId("' + req.query.userid+ '")';
  User.findOne({_id: userid}, function (err,user){
    if(err){
      console.log(err);
      return err;
    }
    // console.log(user);
    return res.status(200).json(user);
  });
});


router.get('/get-user-friends-list', function (req,res) {

  // var userID = 'ObjectId("' + req.query.id+ '")';
  var userID = req.query.id;

  console.log(userID);

  User.aggregate([{
    $lookup: {
      from: "users",
      localField: "friends",
      foreignField: "_id",
      as: "friendsList"
    }
  },{
      $match: {
        "_id": new mongoose.Types.ObjectId(userID)
      }
    },{
      $project: {
        "friendsList": 1,
      }
    }
  ], function (err, result) {
    if (err) {
      console.log("An error occurred");
      console.log(err);
      return err;
    }
    return res.status(200).json(result[0].friendsList);
  });
});

module.exports = router;
