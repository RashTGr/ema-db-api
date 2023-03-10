const { query } = require('../config/db');

class Course {
    constructor(course) {
        this.CourseID = course.CourseID;
        this.Title = course.Title;
        this.TeacherID = course.TeacherID;
        this.isAvailable = course.isAvailable;
    }
    static getAllAvailableCourses(result) {
        query('SELECT * FROM courses WHERE isAvailable = true', (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            result(null, res);
        });
    }

    static assignCourseToTeacher(courseID, teacherID, result) {
        query('UPDATE courses SET TeacherID = ? WHERE CourseID = ?', [teacherID, courseID], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            if (res.affectedRows === 0) {
                result({ kind: 'not_found' }, null);
                return;
            }

            result(null, { CourseID: courseID, TeacherID: teacherID, ...course });
        });
    }

    static enableCourse(courseID, result) {
        query('UPDATE courses SET isAvailable = true WHERE CourseID = ?', courseID, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            if (res.affectedRows === 0) {
                result({ kind: 'not_found' }, null);
                return;
            }

            result(null, { CourseID: courseID, isAvailable: true });
        });
    }

    static disableCourse(courseID, result) {
        query('UPDATE courses SET isAvailable = false WHERE CourseID = ?', courseID, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            if (res.affectedRows === 0) {
                result({ kind: 'not_found' }, null);
                return;
            }

            result(null, { CourseID: courseID, isAvailable: false });
        });
    }
}

module.exports = Course;
