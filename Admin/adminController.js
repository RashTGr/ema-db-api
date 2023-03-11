const pool = require('../config/db');


// API key for Admin
exports.apiKey = (req, res, next) => {
    const apiKey = req.headers['api-key'];
    const roleID = req.headers['roleid'];

    // Check if the apiKey and roleID headers are present and valid
    if (apiKey !== 'authAdmin' || roleID !== 'roleid-1') {
        return res.status(403).json({ error: 'Unauthorized role' });
    }
    // If headers are valid, move on to the next middleware
    next();
}

// Course availability
exports.updateCourseAvailability = async (req, res) => {
    const { isAvailable } = req.body;
    const { courseID } = req.params;

    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(
            'UPDATE courses SET isAvailable = ? WHERE CourseID = ?',
            [isAvailable, courseID]
        );
        conn.release();
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course availability updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Assign teacher to a course
exports.assignTeacherToCourse = async (req, res) => {
    const { teacherID } = req.body;
    const { courseID } = req.params;

    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(
            'UPDATE courses SET TeacherID = ? WHERE CourseID = ?',
            [teacherID, courseID]
        );
        conn.release();
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Teacher assigned to course successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

