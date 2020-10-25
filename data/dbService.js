const mssql = require('mssql');
const dotenv = require('dotenv');
dotenv.config()

const sqlConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOSTNAME,
    database:process.env.DB_NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};

var executeQuery = function (sql, res) {
    const conn = new mssql.ConnectionPool(sqlConfig);
    conn.connect().then(function () {
        const req = new mssql.Request(conn);
        req.query(sql).then(function (data) {
            res(data);
        }).catch(function (err) {
            console.log(err);
            res(null, err);
        })
    }).catch(function (err) {
        res(null, err);
    })
}


module.exports = {
    executeQuery
}