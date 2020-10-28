const dbService = require('../../data/dbService');
const response = require('../../customResponse');

module.exports = {
    getReceipts: async function (req, res) {
        let getRoleQuery = "SELECT * FROM receipts";
        dbService.executeQuery(getRoleQuery, function (roleData, err) {
            if(err){
                console.log("-------error------" + err);
                return response.errorResponse(res, err, 500);
            }else{
                return response.successResponse(res, "Receipts fetched successfully",roleData.recordset, 200);
            }
        });
    },

    getReceiptById: async function (req, res) {
        let id = req.params.id; 
        let getRoleQuery = `SELECT * FROM receipts where id= ${id}`;
        dbService.executeQuery(getRoleQuery, function (roleData, err) {
            if(err){
                console.log("-------error------" + err);
                return response.errorResponse(res, err, 500);
            }else{
                return response.successResponse(res, "Receipt fetched successfully",roleData.recordset[0], 200);
            }
        });
    },

    submitReceipt: async function (req, res) {
        let reqBody = req.body;
        if (!reqBody.userId) {
            return response.errorResponse(res, "Required params missing", 400);
        }
        let max_id_query = "select max(id) as id from receipts";
        dbService.executeQuery(max_id_query, function (maxIdResp, err) {
            if (err) {
                return response.errorResponse(res, err, 500);
            } else {
                console.log(maxIdResp.recordset[0].id);
                let id = maxIdResp.recordset[0].id + 1;
                let query = `INSERT INTO receipts (id, userId, item, pattern, startDate, category, contents, receiver, amount, status ) VALUES
         (${id},'${reqBody.userId}', '${reqBody.item}' ,'${reqBody.pattern}', '${reqBody.startDate}', '${reqBody.category}', '${reqBody.contents}', '${reqBody.receiver}', '${reqBody.amount}', '${0}')`;
                dbService.executeQuery(query, function (data, err) {
                    if (err) {
                        if (err.number == 2601) {
                            return response.errorResponse(res, "Your receipt is already present", 400);
                        }else{
                            return response.errorResponse(res, err, 500);
                        }
                    } else {
                        return response.successResponse(res, "Receipt submitted Successfully", [], 201);
                    }
                });
            }
        });
    },

    setReceiptStatus: async function (req, res) {
        if (!req.body.id) {
            return response.errorResponse(res, "Required params missing", 401);
        }
        let receiptId = req.body.id;
        let status = req.body.status;
        let updateQuery = `update receipts set status= ${status} where id =${receiptId}`
        console.log(updateQuery);
        dbService.executeQuery(updateQuery, function (updateData, err) {
            if (err) {
                response.errorResponse(res, "Receipt status cannot be changed", 400);
            } else {
                console.log("Receipt status change error");
                return response.successResponse(res, "Receipt status changed Successfully", [], 201);
            }
        });
    },
    
    deleteReceipt: async function (req, res) {
        if (!req.query.token || !req.query.receiptId) {
            return response.errorResponse(res, "Required params missing", 401);
        }
        let receiptId = req.query.receiptId;
        let updateQuery = `DELETE FROM receipts where where id =${receiptId}`
        console.log(updateQuery);
        dbService.executeQuery(updateQuery, function (updateData, err) {
            if (err) {
                response.errorResponse(res, "Receipt cannot be deleted", 400);
            } else {
                console.log("Receipt delete error");
                return response.successResponse(res, "Receipt deleted Successfully", [], 201);
            }
        });
    }
};