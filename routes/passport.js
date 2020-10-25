var passport = require('passport');
var strategy = require('passport-local');
var dbService = require('../data/dbService');
let jwt = require('jsonwebtoken');
// const Config = require('../config')
passport.use(new strategy({ session: false }, function (username, password, callback) {
    //Stored Procedure
    var query = "[GetUserAuthentication] '" + username + "', '" + password + "'";

    //Get Data From Database
    dbService.executeQuery(query, function (data, err) {
        if (err) {
            callback(null, err);
        } else {
            var result = data.recordset
            if (result.length > 0) {
                let token = jwt.sign(result[0], process.env.SECRET_KEY, {
                    algorithm: process.env.ALGORITHM,
                    expiresIn: '2 days'
                });
                callback({ user: result[0], token: token, });
            } else {
                callback({ user: null, token: null });
            }
        }
    });
}));

module.exports = passport;