const express = require('express');

// Create a new router instance and then defines the routes
const router = express.Router();
const adminController = require('../Admin/adminController');

// Enable or Disable course availability
router.put('/courses/:courseID/availability', adminController.apiKey, adminController.updateCourseAvailability);

// Assign courses to a teacher
router.put('/courses/:courseID/teacher', adminController.apiKey, adminController.assignTeacherToCourse);

module.exports = router;

