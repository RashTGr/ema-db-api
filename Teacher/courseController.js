
const Course = require("../models/course");

// Admin Enables or Disables courses
exports.enableDisableCourse = async (req, res) => {
    const courseId = req.params.id;
    const { isAvailable } = req.body;

    // Check if user's role is Admin
    if (req.user.role !== "Admin"){
        return res.status(401).json({message: "Unauthorized access!"});
    }
    try {
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        course.isAvailable = isAvailable;
        await course.save();

        res.json({ message: "Course availability updated successfully "});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};
