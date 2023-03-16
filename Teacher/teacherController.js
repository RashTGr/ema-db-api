const pool = require('../config/db');

// API key middleware for Teacher
exports.apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['api-key'];
    const roleID = req.headers['roleid'];

    // Check if the apiKey and roleID headers are present and valid
    if (apiKey !== 'authTeacher' || roleID !== 'roleid-2') {
        return res.status(403).json({ error: 'Unauthorised activity!' });
    }

    // If headers are valid, move on to the next middleware
    next();
}

// Get all courses assigned to a teacher
exports.getCourses = async (req, res) => {
    const { userID } = req.params;

    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query('SELECT * FROM courses WHERE TeacherID = ?', [userID]);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
};

// Assign marks to students for a course
exports.assignMarks = async (req, res) => {
    const { userID, courseID, mark } = req.body;

    // Update the mark for the student in the course
    try {
        const conn = await pool.getConnection();
        await conn.query('UPDATE enrolments SET Mark = ? WHERE UserID = ? AND CourseID = ?', [mark, userID, courseID]);
        conn.release();
        res.status(200).json({ message: 'Mark assigned successfuly'});
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error!'});
    }
};

