const express = require('express');
const router = express.Router();
const studentController = require('../Student/studentController');

// GET all available courses
router.get('/courses', studentController.apiKeyMiddleware, studentController.getCourses);

// Enroll in a course
router.post('/enroll', studentController.apiKeyMiddleware, studentController.enrollCourse);

module.exports = router;