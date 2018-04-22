const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const path = require("path");
const User = require("../schemas/user_schema");

router.get('/',function(req,res){

  var userid = req.query.userid;

  User.findOne({userID: userid}, function (err,user){
    if(err){
      console.log(err);
      return err;
    }
    // console.log(user);
    return res.status(200).json(user);
  });
});

router.get('/get-user-friends-list', function (req,res) {

  console.log('getUserdFriendslist');

  var userID = req.query.id;

  User.aggregate([{
    $lookup: {
      from: "users",
      localField: "friends",
      foreignField: "userID",
      as: "friendsList"
    }
  },{
      $match: {
        "userID": userID
      }
    },{
      $project: {
        "_id": 0,
        "friendsList": 1,
      }
    }
  ], function (err, result) {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(result[0]);
    return res.status(200).json(result[0].friendsList);
  });
});
module.exports = router;
