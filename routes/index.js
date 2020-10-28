var express = require('express');
var router = express.Router();
var attendance = require('../controllers/attendence/attendence');
var receipts = require('../controllers/receipts/receipts');

/* GET home page. */
router.get('/', function (req, res, next) {
  // var loggeduser = req.cookies.loggeduser;
  // res.render('index', { title: 'Welcome to ExpressJS + Passport + JSON Web Token (JWT)', user: loggeduser });
  res.send('index')
  // , { title: 'Welcome to ExpressJS + Passport + JSON Web Token (JWT)', user: loggeduser });
});

router.route('/save-attendance').post(attendance.addAttendance);

router.route('/receipts').get(receipts.getReceipts);
router.route('/receipts/:id').get(receipts.getReceiptById);
router.route('/receipts').post(receipts.submitReceipt);
router.route('/receipts').put(receipts.setReceiptStatus);
router.route('/receipts').delete(receipts.deleteReceipt);

module.exports = router;