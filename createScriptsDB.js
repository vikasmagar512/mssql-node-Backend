const express = require('express');
const sql = require('mssql');
const PORT = 3001;

const app = express();

const sqlConfig = {
    user: 'admin',
    password: 'Fanta983038!',
    server: 'hispiadb.crydgfoznh1m.ap-northeast-2.rds.amazonaws.com',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// const con = sql.createConnection(sqlConfig);

app.post('/create', (req, res) => {
    sql.connect(sqlConfig,function(err) {
        if (err) throw err;
        sql.query('CREATE DATABASE IF NOT EXISTS main;');
        sql.query('USE main;');
        sql.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));', function(error, result, fields) {
            console.log(result);
        });
    });
});
app.post('/insert', (req, res) => {
    if (req.query.username && req.query.email && req.query.age) {
        console.log('Request received');
        sql.connect(sqlConfig,function(err) {
            sql.query(`INSERT INTO main.users (username, email, age) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.age}')`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send({username: req.query.username, email: req.query.email, age: req.query.age});
                if (fields) console.log(fields);
            });
        });
    } else {
        console.log('Missing a parameter');
    }
});
app.listen(PORT,function(){
    console.log(`Server started at ${PORT}`)
})