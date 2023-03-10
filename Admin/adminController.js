const mysql = require('mysql2/promise');
const db = require('../config/db');

// To check if there are any validation errors
const { validationResult } = require('express-validator');

// API key for Admin
const adminApiKey = 'myKey';
const adminRoleID = '1';

// Course availability
const updateCourseAvailability = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { isAvailable } = req.body;
    const { courseID } = req.params;

    try {
        // check if user is Admin or not
        const apiKey = req.headers['x-api-key'];
        const roleID = req.headers['role-id'];
        if (apiKey !== adminApiKey || roleID !== adminRoleID) {
            return res.status(403).json({message: 'Access denied'});
        }
        const connection = await mysql.createConnection(db);
        const [result] = await connection.execute(
            'UPDATE courses SET isAvailable = ? WHERE CourseID = ?',
            [isAvailable, courseID]
        );
        connection.end();
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Course not found'});
        }
        res.status(200).json({message: 'Course availability updated successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error'});
    }
};

// Assign teacher to a course
const assignTeacherToCourse = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const { teacherID } = req.body;
    const { courseID } = req.params;

    try {
        // check if user is Admin or not
        const apiKey = req.headers['x-api-key'];
        const roleID = req.headers['role-id'];
        if (apiKey !== adminApiKey || roleID !== adminRoleID) {
            return res.status(403).json({ message: 'Access denied'});
        }

        const connection = await mysql.createConnection(db);
        const [result] = await connection.execute(
            'UPDATE courses SET TeacherID = ? WHERE CourseID = ?',
            [teacherID, courseID]
        );
        connection.end();
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found'});
        }
        res.status(200).json({ message:  'Teacher assignd to couurse successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error!'});
    }
};

module.exports = { updateCourseAvailability, assignTeacherToCourse };


