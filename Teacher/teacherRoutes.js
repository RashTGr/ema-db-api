const express = require('express');
const router = express.Router();
const teacherController = require('../Teacher/teacherController');

// Get all courses assigned to a teacher
router.get('/:userID/courses',teacherController.apiKeyMiddleware , teacherController.getCourses);

// Assign marks to students for a course
router.put('/courses/marks',teacherController.apiKeyMiddleware , teacherController.assignMarks);

module.exports = router;
