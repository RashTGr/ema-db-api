const course = require('../models/course');
const role = require('../models/role');
const user = require('../models/user');
const enrolment = require('../models/enrolment');

// Function to add a new course
async function addCourse(req, res) {
    try {
        // Check if the user is an admin
        const adminRole = await role.getRoleByName('admin');
        if (req.body.roleId !== adminRole.RoleID) {
            return res.status(403).json({ message: 'You do not have permission to add a new course.' });
        }

        // Create the new course
        const newCourse = await course.create(req.body);

        res.json({ message: 'Course added successfully.', course: newCourse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// Function to delete a course
async function deleteCourse(req, res) {
    try {
        // Check if the user is an admin
        const adminRole = await role.getRoleByName('admin');
        if (req.body.roleId !== adminRole.RoleID) {
            return res.status(403).json({ message: 'You do not have permission to delete a course.' });
        }

        // Delete the course
        const courseId = req.params.id;
        const deletedCourse = await course.destroy({ where: { CourseID: courseId } });

        if (deletedCourse === 0) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        res.json({ message: 'Course deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// Function to get all enrolments
async function getAllEnrolments(req, res) {
    try {
        // Check if the user is an admin
        const adminRole = await role.getRoleByName('admin');
        if (req.query.roleId !== adminRole.RoleID) {
            return res.status(403).json({ message: 'You do not have permission to view all enrolments.' });
        }

        // Get all enrolments
        const enrolments = await enrolment.findAll({ include: [course, user] });

        res.json(enrolments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = { addCourse, deleteCourse, getAllEnrolments };
