var dbService = require('../data/dbService');

var getData = function (req, res, callback) {
    //Stored Procedure
    let query = "[GetCustomers]";

    //Database Query
    dbService.executeQuery(query, function (data, err) {
        if (err) {
            callback(null, err);
        } else {
            callback(data);
        }
    });
};

var getDataById = function (req, res, callback) {
    let customerId = req.params.id; let status = req.query.status;

    //Stored Procedure
    var query = "[GetCustomersByID] " + customerId + "";

    //Database Query
    dbService.executeQuery(query, function (data, err) {
        if (err) {
            callback(null, err);
        } else {
            callback(data);
        }
    });
};

var postData = function (req, res, callback) {
    let customerId = 0;
    if (isNaN(parseInt(req.body.customerId)))
        customerId = 0;
    else
        customerId = parseInt(req.body.customerId);

    //Stored Procedure
    var query = "[SaveCustomer] " + customerId + ", '" + req.body.customerName + "', '" + req.body.customerContact + "', '" + req.body.customerEmail + "'";

    //Database Query
    dbService.executeQuery(query, function (data, err) {
        if (err) {
            callback(null, err);
        } else {
            callback(data);
        }
    });
};

var deleteData = function (req, res, callback) {
    let customerId = req.params.id;

    //Stored Procedure
    var query = "[DeleteCustomersByID] " + parseInt(customerId) + "";

    //Database Query
    dbService.executeQuery(query, function (data, err) {
        if (err) {
            callback(null, err);
        } else {
            callback(data);
        }
    });
};

module.exports = {
    getData,
    getDataById,
    postData,
    deleteData
};