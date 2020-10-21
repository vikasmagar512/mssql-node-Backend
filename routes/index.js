var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // var loggeduser = req.cookies.loggeduser;
  // res.render('index', { title: 'Welcome to ExpressJS + Passport + JSON Web Token (JWT)', user: loggeduser });
  res.send('index')
  // , { title: 'Welcome to ExpressJS + Passport + JSON Web Token (JWT)', user: loggeduser });
});

module.exports = router;
