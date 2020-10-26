var express = require('express');
var router = express.Router();
var passport = require('./passport');
var jwt = require('jsonwebtoken');
var registration = require('../controllers/user/registration');
var roles_access = require('../controllers/user/roles_access');

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   let status = req.query.status;
  /* res.send('respond with a resource'); */
//   res.render('users', { message: status });
// });

/* Post login */
router.post('/login', function (req, res, next) {
  console.log('********************login*****************************')
  passport.authenticate('local', function (data, err) {
    if (err) {
      console.log(err.name + ':' + err.message);
      res.send(err)
    } else {
      if (data.user != null) {
        debugger
        console.log(data.user)
        console.log('---------------------------Error---------------------')
        res.send({data})
      }else {
        console.log('---------------------------Error---------------------')
        res.send({err})
      }
    }
  })(req, res, next);
});

// GET user Logout
router.get('/logout', function (req, res, next) {
  res.clearCookie('jwtoken');
  res.clearCookie('loggeduser');
  res.redirect('/users');
});


router.post('/verify-token', function (req, res, next) {
  console.log('********************login*****************************')
  jwt.verify(req.body.access_token, process.env.SECRET_KEY,
    {
        algorithm: process.env.ALGORITHM
    }, function (err, decoded) {
        if (err) {
            let errordata = {
                message: err.message,
                expiredAt: err.expiredAt
            };
            console.log(errordata);
            return res.render('customers', { title: 'Unauthorized Access', status: 'Token Expired at ' + err.expiredAt });
        }
        req.decoded = decoded;
        console.log(decoded)
        res.send({data:{user:decoded}})
      })
});
router.route('/register').post(registration.registerUser);
router.route('/roles').get(roles_access.getSystemRoles);
router.route('/verify-email').get(registration.verifyEmail);
module.exports = router;
