const mysql = require('mysql2/promise');
// Create a connection pool to reuse connections
const db = require('../config/db');
const course = require('../models/course')
const enrolment = require('../models/enrolment')
const roles = require('../models/role')
// Function to get a list of courses assigned to the authenticated teacher
async function getCourses(req, res) {
    try {
        // Check if the API key is valid and the user is a teacher
        const apiKey = req.headers.authorization;
        if (apiKey !== 'authTeacher:roleid-2') {
            return res.status(401).json({ message: 'Invalid API key.' });
        }

        // Get the teacher's assigned courses
        const teacherId = req.query.teacherId;
        const conn = await db.getConnection();
        const [assignedCourses] = await conn.execute(
            'SELECT * FROM courses WHERE TeacherID = ?',
            [teacherId]
        );
        conn.release();

        res.json({ courses: assignedCourses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// Function to get a list of students enrolled in a particular course assigned to the authenticated teacher
async function getStudents(req, res) {
    try {
        // Check if the API key is valid and the user is a teacher
        const apiKey = req.headers.authorization;
        if (apiKey !== 'authTeacher:roleid-2') {
            return res.status(401).json({ message: 'Invalid API key.' });
        }

        // Check if the teacher is assigned to the course
        const courseId = req.params.courseID;
        const teacherId = req.query.teacherId;
        const conn = await db.getConnection();
        const [courseData] = await conn.execute(
            'SELECT * FROM courses WHERE CourseID = ? AND TeacherID = ?',
            [courseId, teacherId]
        );
        if (!courseData) {
            conn.release();
            return res.status(404).json({ message: 'Course not found.' });
        }

        // Get the list of students enrolled in the course
        const [enrolmentData] = await conn.execute(
            'SELECT * FROM enrolments WHERE CourseID = ?',
            [courseId]
        );
        const studentIds = enrolmentData.map((enrolment) => enrolment.student_id);

        // Get the student details from the user table
        const [studentData] = await conn.execute(
            'SELECT * FROM roles JOIN users ON roles.RoleID = UserID WHERE roles.role_id = ? AND roles.user_id IN (?)',
            [3, studentIds]
        );
        conn.release();

        res.json({ students: studentData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = { getCourses, getStudents };
