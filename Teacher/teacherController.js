const db = require('../config/db');

// API key middleware
exports.apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['api-key'];
    const roleID = req.headers['roleid'];

    // Check if the apiKey and roleID headers are present and valid
    if (apiKey !== 'authTeacher' || roleID !== 'roleid-2') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    // If headers are valid, move on to the next middleware
    next();
}

// Get all courses assigned to a teacher
exports.getCourses = (req, res) => {
    const { userID } = req.params;

    db.query('SELECT * FROM courses WHERE TeacherID = ?',
        [userID], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).json(result);
        });
};

// Assign marks to students for a course
exports.assignMarks = (req, res) => {
    const { courseID } = req.params;
    const { userID, mark } = req.body;

    // Update the mark for the student in the course
    db.query('UPDATE enrolments SET Mark = ? WHERE CourseID = ? AND UserID = ?',
        [mark, courseID, userID], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Mark assigned successfully' });
        });
};

