const db = require('../config/db');

class Role {
    static getAllRoles() {
        const sql = 'SELECT * FROM roles';
        return db.promise().query(sql).then(([rows]) => rows);
    }

    static getRoleById(roleId) {
        const sql = 'SELECT * FROM roles WHERE RoleID = ?';
        return db.promise().query(sql, [roleId]).then(([rows]) => rows[0]);
    }

    static getRoleByName(roleName) {
        const sql = 'SELECT * FROM roles WHERE Role = ?';
        return db.promise().query(sql, [roleName]).then(([rows]) => rows[0]);
    }

}

module.exports = Role;
