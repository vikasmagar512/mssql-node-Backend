const mssql = require('mssql');

const sqlConfig = {
    user: 'admin',
    password: 'Fanta983038!',
    server: 'hispiadb.crydgfoznh1m.ap-northeast-2.rds.amazonaws.com',
    database: 'dongil',
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
            res(null, err);
        })
    }).catch(function (err) {
        res(null, err);
    })
}

module.exports = {
    executeQuery
}