const express = require('express');
const app = express();
const apiPort = process.env.apiPort || 3000;
const db = require('./config/db');

// JSON middleware to parse request bodies
app.use(express.json());

// Imports for admin, teacher and student routes
const adminRoute = require('./Admin/adminRoutes');
const teacherRoute = require('./Teacher/teacherRoutes');
const studentRoute = require('./Student/studentRoutes');

// Define a root route to test that the server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});



// const adminRoutes = require('./Admin/adminRoutes');
// const teacherRoutes = require('./Teacher/teacherRoutes');
// const studentRoutes = require('./Student/studentRoutes');
//
// app.use(bodyParser.json());
// app.use(cors());
//
// // Routes for different roles
// app.use('/admin', authMiddleware.isAdmin, adminRoutes);
// app.use('/teacher', authMiddleware.isTeacher, teacherRoutes);
// app.use('/student', authMiddleware.isStudent, studentRoutes);


// Start server and sync DB

app.listen(apiPort, () => {
    console.log(`Server listening on PORT: ${apiPort}`);
});
