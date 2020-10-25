/**
 * @recordSuccessResponse @recordNotFoundResponse @errorResponse for common function of use response to the Client side directly
 **/
const message = {
    insert_success: "Record inserted successfully",
    not_found: "Records not found",
    recordfound: "Records found",
    requiredParamsMissing: "Required params missing",
    errorResponse: "Something went wrong!",
    deleteReocrd: "Record deleted successfully",
    updateRecord: "Record updated successfully",
    notupdatedRecord: "Record not updated",
    noDistinct: "Distinct Id Not Exists",
    noOfBillingCycles: "Number of billing cycles can't be greater than one for yearly pack",
    canceledSubscription: "Subscription has been cancelled",
    alreadysubscribed: "Already Subscribed",
    alreadyexist: "Email already exists"
}

module.exports = {

    successResponse: function (res, msg, data = [], responseCode) {
        res.status(responseCode);
        res.send({status: 1, message: msg, data: data, responseCode: responseCode});
    },

    errorResponse: function (res, msg, responseCode) {
        res.status(responseCode);
        res.send({status: 0, message: msg, responseCode: responseCode});
    }


};
