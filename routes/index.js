var express = require('express');
var router = express.Router();
var attendance = require('../controllers/attendence/attendence');

/* GET home page. */
router.get('/', function (req, res, next) {
  // var loggeduser = req.cookies.loggeduser;
  // res.render('index', { title: 'Welcome to ExpressJS + Passport + JSON Web Token (JWT)', user: loggeduser });
  res.send('index')
  // , { title: 'Welcome to ExpressJS + Passport + JSON Web Token (JWT)', user: loggeduser });
});

router.route('/save-attendance').post(attendance.addAttendance);
module.exports = router;