var express = require('express');
var router = express.Router();
//Import the mongoose module
var mongoose = require('mongoose');

// GET home page.
router.get('/', function(req, res) {
  res.redirect('/catalog');
});
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// });

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = router;

