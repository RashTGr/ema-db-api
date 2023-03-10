
const express = require("express");
const router =express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware"); // check authMiddleware
const { teacherController } = require("../Teacher/teacherController"); // check teacherController

router.post("/teachers/:teacherId/courses/:courseId", authMiddleware(["admin"]), teacherController.assignCourse);

module.exports = router;

