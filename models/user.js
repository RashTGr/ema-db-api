// Database connection pool
const { db } = require('../config/db');

const User = function(user) {
    this.Name = user.Name;
    this.RoleID = user.RoleID;
};

User.getAll = result => {
    db.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.log('Error fetching users: ', err);
            result(null, err);
            return;
        }
        console.log('Users fetched: ', res);
        result(null, res);
    });
};

User.getById = (userId, result) => {
    db.query(`SELECT * FROM users WHERE UserID = ${userId}`, (err, res) => {
        if (err) {
            console.log('Error fetching user: ', err);
            result(null, err);
            return;
        }
        console.log('User fetched: ', res);
        result(null, res);
    });
};

User.create = (newUser, result) => {
    db.query('INSERT INTO users SET RoleID = ?', newUser, (err, res) => {
        if (err) {
            console.log('Error creating user: ', err);
            result(null, err);
            return;
        }
        console.log('User created: ', { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.updateById = (userId, user, result) => {
    db.query(
        'UPDATE users SET Name = ?, RoleID = ? WHERE UserID = ?',
        [user.Name, user.RoleID, userId],
        (err, res) => {
            if (err) {
                console.log('Error updating user: ', err);
                result(null, err);
                return;
            }
            if (res.affectedRows === 0) {
                result({ kind: 'not_found' }, null);
                return;
            }
            console.log('User updated: ', { id: userId, ...user });
            result(null, { id: userId, ...user });
        }
    );
};

User.remove = (userId, result) => {
    db.query('DELETE FROM users WHERE UserID = ?', userId, (err, res) => {
        if (err) {
            console.log('Error deleting user: ', err);
            result(null, err);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('User deleted with id: ', userId);
        result(null, res);
    });
};

// Exports to be used in other parts of API
module.exports = User;

