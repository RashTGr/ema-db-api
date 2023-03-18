const express = require('express');
const app = express();
const apiPort = process.env.apiPort || 3000;
const db = require('./config/db');


// Imports for admin, teacher and student routes
const adminRoutes = require('./Admin/adminRoutes');
const teacherRoutes = require('./Teacher/teacherRoutes');
const studentRoutes = require('./Student/studentRoutes');


// Establish a connection to the database
try {
    db.getConnection()
        .then(connection => {
            console.log('Connected to the MySQL database');
            connection.release();
        })
        .catch(error => {
            console.error('Failed to connect to the MySQL database', error);
        });
} catch (error) {
    console.error('Failed to connect to the MySQL database', error);
}


// JSON middleware to parse request bodies
app.use(express.json());

// Use admin, student, and teacher routes
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes)


// Start server and sync DB
app.listen(apiPort, () => {
    console.log(`Server listening on PORT: ${apiPort}`);
});
