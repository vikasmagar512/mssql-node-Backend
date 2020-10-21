var express = require('express');
var router = express.Router();
var dbService = require('../data/dbService');
var custService = require('../data/customerService');
let verifyToken = require('./verifytoken');

/* GET customers listing. */
router.get('/', verifyToken, function (req, res, next) {
  let status = req.query.status;

  //Service Call
  custService.getData(req, res, function (data, err) {
    if (err) {
      res.render('customers', { message: 'Error Loading Data!!' });
      console.log(err.name + ':' + err.message);
    } else {
      res.render('customers', { customerdata: data.recordset, message: status });
    }
  });

});

/* GET customers ByID */
router.get('/edit/:id', verifyToken, function (req, res, next) {
  let status = req.query.status;

  custService.getDataById(req, res, function (data, err) {
    if (err) {
      res.render('customers', { message: 'Error Binding Data!!' });
      console.log(err.name + ':' + err.message);
    } else {
      var customeredit = data.recordset[0];

      //Service Call
      custService.getData(req, res, function (data, err) {
        if (err) {
          res.render('customers', { message: 'Error Loading Data!!' });
          console.log(err.name + ':' + err.message);
        } else {
          res.render('customers', { customerdata: data.recordset, customer: customeredit, message: status });
        }
      });
    }
  });
});

/* POST customer */
router.post('/save', verifyToken, function (req, res, next) {
  let status = req.query.status;

  //Service Call
  custService.postData(req, res, function (data, err) {
    if (err) {
      res.render('customers', { message: 'Error Saving Data!!' });
      console.log(err.name + ':' + err.message);
    } else {
      res.redirect('/customers');
    }
  });
});


/* DELETE Delete customers */
router.get("/delete/:id", verifyToken, function (req, res) {
  let status = req.query.status;

  //Service Call
  custService.deleteData(req, res, function (data, err) {
    if (err) {
      res.render('customers', { message: 'Error Deleting Data!!' });
      console.log(err.name + ':' + err.message);
    } else {
      res.redirect('/customers');
    }
  });
});

module.exports = router;
