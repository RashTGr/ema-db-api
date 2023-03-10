
const express = require("express");
const router = express.Router();
const courseController = require("../Teacher/courseController");
const authMiddleware = require("../middlewares/authMiddleware");

// Enable or Disable a Course at the Admin level
router.put(
    "/course/:id/enable-disable",
    authMiddleware.checkAuth,
    courseController.enableDisableCourse
);

module.exports = router;
