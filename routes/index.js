var express = require('express');
var router = express.Router();

//Home Page route
router.get('/', function(req, res, next) {
  res.render("index");
});


//Login Page route
router.get('/login', function(req, res, next) {
  res.send("Login");
});


//SignUp Page route
router.get('/signup', function(req, res, next) {
  res.send("SignUp");
});







module.exports = router;
