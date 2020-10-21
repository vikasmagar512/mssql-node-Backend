module.exports = {
    sqlConfig : {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOSTNAME,
        database: process.env.DB_NAME,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    }
};
