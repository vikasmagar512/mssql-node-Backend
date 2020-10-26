var dbService = require('../../data/dbService');
var response = require('../../customResponse');
module.exports = {
    getSystemRoles: async function (req, res) {
        let getRoleQuery = "SELECT * FROM role_master";
        dbService.executeQuery(getRoleQuery, function (roleData, err) {
            if(err){
                console.log("-------error------" + err);
                return response.errorResponse(res, err, 500);
            }else{
                return response.successResponse(res, "Roles fetched successfully",roleData.recordset, 200);
            }
        });

    }
};