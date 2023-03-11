const mysql = require('mysql2/promise');

const db = mysql.createPool('mysql://root:groupc542@localhost/mydb');

const query = (sql, params) => {
    return db.query(sql, params);
};

module.exports = query;
module.exports = db;
