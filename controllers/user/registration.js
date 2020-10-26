var randomstring = require("randomstring");
const dbService = require('../../data/dbService');
const response = require('../../customResponse');
const emailTemplate = require('../../emailTemplate');

module.exports = {
    registerUser: async function (req, res) {
        let reqBody = req.body;
        if (!reqBody.username || !reqBody.password || !reqBody.firstName || !reqBody.lastName || !reqBody.phone) {
            return response.errorResponse(res, "Required params missing", 204);
        }
        let getRoleQuery = "SELECT * FROM role_master where role_name = 'user'";
        dbService.executeQuery(getRoleQuery, function (roleData, err) {
            if (err) {
                console.log("-------error------" + err);
                return response.errorResponse(res, err, 500);
            } else {
                let roleId = roleData.recordset[0].id;
                const verificationToken = randomstring.generate(20);
                let query = `INSERT INTO users (userName, password , firstName , lastName , phone, roleId ,isVerified , verificationToken ) VALUES
         ('${reqBody.username}', '${reqBody.password}' ,'${reqBody.firstName}','${reqBody.lastName}','${reqBody.phone}' ,'${roleId}' ,1 ,'${verificationToken}')`;
                dbService.executeQuery(query, function (data, err) {
                    if (err) {
                        if (err.number == 2601) {
                            return response.errorResponse(res, "A user with this email already exists", 204);
                        } else {
                            return response.errorResponse(res, err, 500);
                        }
                    } else {
                        let argument = {
                            toEmail: reqBody.username,
                            email_verification_link: process.env.API_URL + "/verify-email?username=" + reqBody.username + "&token=" + verificationToken
                        }
                        console.log(argument);
                        emailTemplate.emailVerification(argument)
                        return response.successResponse(res, "Registered Successfully", [], 201);
                    }
                });
            }
        });

    },
    verifyEmail: async function (req, res) {
        if (!req.query.token || !req.query.username) {
            return response.errorResponse(res, "Required params missing", 401);
        }
        let token = req.query.token;
        let userName = req.query.username;
        let getRoleQuery = `SELECT verificationToken ,userId FROM users where userName = '${userName}'`;
        dbService.executeQuery(getRoleQuery, function (tokenData, err) {
            if (err) {
            } else {
                if (tokenData.recordset[0].verificationToken == token) {
                    let updateQuery = `update users set isVerified= 1 where userId =${tokenData.recordset[0].userId}`
                    console.log(updateQuery);
                    dbService.executeQuery(updateQuery, function (updateData, err) {
                        if (err) {
                            response.errorResponse(res, "Your account could not be verified", 401);
                        } else {
                            console.log("verification successful");
                            // res.redirect(process.env.APP_URL + '/login');
                            response.successResponse(res,'Email verified',[],200)
                        }
                    });
                }
            }
        });
    }
};