const db = require('../config/db');

const Enrolment = {};

Enrolment.createEnrolment = async (userID, courseID) => {
    const result = await db.query(
        'INSERT INTO enrolments (CourseID, UserID) VALUES (?, ?)',
        [courseID, userID]
    );
    return result[0].insertId;
};

Enrolment.getEnrolmentsByUserId = async (userID) => {
    const [rows] = await db.query(
        'SELECT * FROM enrolments WHERE UserID = ?',
        [userID]
    );
    return rows;
};

Enrolment.getEnrolmentById = async (enrolmentID) => {
    const [rows] = await db.query(
        'SELECT * FROM enrolments WHERE EnrolmentID = ?',
        [enrolmentID]
    );
    return rows[0];
};

Enrolment.updateEnrolmentMark = async (enrolmentID, mark) => {
    await db.query(
        'UPDATE enrolments SET Mark = ? WHERE EnrolmentID = ?',
        [mark, enrolmentID]
    );
};

module.exports = Enrolment;
