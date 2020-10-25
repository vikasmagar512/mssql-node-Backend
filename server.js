/*
const express = require('express');
const mssql = require('mssql');
const PORT = 3001;

const app = express();

const sqlConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOSTNAME,
    database:DB_NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

const sql = new mssql.ConnectionPool(dbConfig);

app.get('/',function(req,res){
    let connection = sql.connect(sqlConfig,(err)=>{
        if(err){
            console.log(err)
        }else {
            res.send('DB Connected');
            //code for sql request here.
        }
    })
})
app.post('/users', (req, res) => {
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
})*/
