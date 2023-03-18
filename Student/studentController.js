const pool = require('../config/db');


// API key middleware
exports.apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['api-key'];
    const roleID = req.headers['roleid'];

    // Check if the apiKey and roleID headers are present and valid
    if (apiKey !== 'authStudent' || roleID !== 'roleid-3') {
        return res.status(403).json({ error: 'Unauthorised activity!' });
    }
    // If headers are valid, move on to the next middleware
    next();
};

// Get all available courses
exports.getCourses = async (req, res) => {
    const sql = `
    SELECT
        courses.CourseID,
        courses.Title,
        IFNULL(users.Name, 'ToBeConfirmed') AS TeacherName,
        courses.isAvailable
    FROM
        courses
    LEFT JOIN
        users
    ON
        courses.TeacherID = users.UserID
    WHERE
        courses.isAvailable = ?
    `;

    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(sql, [true]);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Enrol in a course
exports.enrolCourse = async (req, res) => {
    const { courseId, userId } = req.body;

    try {
        // Check if user is already enrolled in the course
        const conn = await pool.getConnection();
        const [enrolled] = await conn.query('SELECT * FROM enrolments WHERE CourseID = ? AND UserID = ?', [courseId, userId]);
        conn.release();

        if (enrolled.length !== 0) {
            return res.status(400).json({ message: 'User is already enrolled in this course' });
        }

        // Create new enrolment
        const conn2 = await pool.getConnection();
        await conn2.query('INSERT INTO enrolments (CourseID, UserID) VALUES (?, ?)', [courseId, userId]);
        conn2.release();

        res.status(201).json({ message: 'Course enrolment successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
