const express = require('express');
const app = express();
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const bodyParser = require('body-parser');
const path = require("path");
const mainRequests = require('./routes/main_route');
const searchRequests = require('./routes/search_route');
const db = mongoose.connection;
const mongoDBURL = "mongodb://SefiShalom:XNj3d3oVdNBMfdYi@cluster0-shard-00-00-d0iqf.mongodb.net:27017,cluster0-shard-00-01-d0iqf.mongodb.net:27017,cluster0-shard-00-02-d0iqf.mongodb.net:27017/Chat?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin";



mongoose.connect(mongoDBURL);
db.on('error', console.error.bind(console, 'MongoDB connection error!\n'));


app.use('/', mainRequests);
app.use('/search-cars-models', searchRequests);
app.use(express.static(path.join(__dirname,'dist')));
app.use(express.static(path.join(__dirname,'src')));
app.use(bodyParser.json());


app.listen(3000,function () {
  console.log("Server Started!\nlistening on port 3000");
});
