const express = require('express');
const router = express.Router();
const adminController = require('./adminController');

// Enable or Disable course availability
router.put('/courses/:courseID/availability', adminController.updateCourseAvailability);

// Assign courses to a teacher
router.put('/courses/:courseID/teacher', adminController.assignTeacherToCourse);

module.exports = router;

