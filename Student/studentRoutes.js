const express = require('express');

// Create a new router instance and then defines the routes
const router = express.Router();
const studentController = require('../Student/studentController');

// GET all available courses
router.get('/courses', studentController.apiKeyMiddleware, studentController.getCourses);

// Enrol in a course
router.post('/enrol', studentController.apiKeyMiddleware, studentController.enrolCourse);

module.exports = router;
