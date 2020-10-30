const express = require('express');
const router = express.Router();
const attendance = require('../controllers/attendence/attendence');
const receipts = require('../controllers/receipts/receipts');

const verifyToken = require('./verifytoken');
/* GET home page. */
router.get('/', function (req, res, next) {
  // const loggeduser = req.cookies.loggeduser;
  // res.render('index', { title: 'Welcome to ExpressJS + Passport + JSON Web Token (JWT)', user: loggeduser });
  res.send('index')
  // , { title: 'Welcome to ExpressJS + Passport + JSON Web Token (JWT)', user: loggeduser });
});

router.route('/save-attendance').post(attendance.addAttendance);

router.route('/receipts').get(receipts.getReceipts);
router.route('/receipts/:id').get(receipts.getReceiptById);
router.route('/receipts').post(receipts.submitReceipt);
router.route('/receipts').put(receipts.setReceiptStatus);
router.route('/receipts/:id').delete(receipts.deleteReceipt);

module.exports = router;