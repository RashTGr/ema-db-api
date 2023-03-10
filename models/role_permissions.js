
const db = require('../config/db');

class RolePermission {
    static getAll() {
        const sql = 'SELECT * FROM role_permissions';
        return db.promise().query(sql).then(([rows]) => rows);
    }

    static getById(id) {
        const sql = 'SELECT * FROM role_permissions WHERE id = ?';
        return db.promise().query(sql, [id]).then(([rows]) => rows[0]);
    }

    static getByRoleId(roleId) {
        const sql = 'SELECT * FROM role_permissions WHERE role_id = ?';
        return db.promise().query(sql, [roleId]).then(([rows]) => rows);
    }

    static create(roleId, permission) {
        const sql = 'INSERT INTO role_permissions (role_id, permission) VALUES (?, ?)';
        return db.promise().query(sql, [roleId, permission]).then(([result]) => {
            return { id: result.insertId, role_id: roleId, permission };
        });
    }

    static update(id, permission) {
        const sql = 'UPDATE role_permissions SET permission = ? WHERE id = ?';
        return db.promise().query(sql, [permission, id]).then(([result]) => {
            return { id, permission };
        });
    }

    static delete(id) {
        const sql = 'DELETE FROM role_permissions WHERE id = ?';
        return db.promise().query(sql, [id]).then(([result]) => {
            return result.affectedRows > 0;
        });
    }
}

module.exports = RolePermission;
