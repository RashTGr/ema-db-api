const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    dbUser: 'root',
    password: 'groupc542',
    database: 'mydb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


module.exports = db;
