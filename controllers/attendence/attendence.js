const dbService = require('../../data/dbService');
const response = require('../../customResponse');

module.exports = {
    addAttendance: async function (req, res) {
        let reqBody = req.body;
        if (!reqBody.userName || !reqBody.userId || !reqBody.venue || !reqBody.timestamp) {
            return response.errorResponse(res, "Required params missing", 400);
        }
        let max_id_query = "select max(id) as id from attendance";
        dbService.executeQuery(max_id_query, function (maxIdResp, err) {
            if (err) {
                return response.errorResponse(res, err, 500);
            } else {
                console.log(maxIdResp.recordset[0].id);
                let id = maxIdResp.recordset[0].id + 1;
                let query = `INSERT INTO attendance (id, user_name , user_id , venue , created_at) VALUES
         (${id},'${reqBody.userName}', '${reqBody.userId}' ,'${reqBody.venue}','${reqBody.timestamp}')`;
                dbService.executeQuery(query, function (data, err) {
                    if (err) {
                        if (err.number == 2601) {
                            return response.errorResponse(res, "Your attendance is already registered", 400);
                        }else{
                            return response.errorResponse(res, err, 500);
                        }

                    } else {
                        // emailTemplate.emailVerification()
                        return response.successResponse(res, "Attendance saved Successfully", [], 201);
                    }
                });
            }
        });
    }

};