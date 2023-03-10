const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, sync } = require("./config/db");

const app = express();

const db = require('./config/db');
// const authMiddleware = require('./authMiddleware');
//
// const adminRoutes = require('./Admin/adminRoutes');
// const teacherRoutes = require('./Teacher/teacherRoutes');
// const studentRoutes = require('./Student/studentRoutes');

app.use(bodyParser.json());
app.use(cors());

// Routes for different roles
// app.use('/admin', authMiddleware.isAdmin, adminRoutes);
// app.use('/teacher', authMiddleware.isTeacher, teacherRoutes);
// app.use('/student', authMiddleware.isStudent, studentRoutes);


// Start server and sync DB
const apiPort = process.env.apiPort || 3000;
app.listen(apiPort, () => {
    console.log(`Server listening on PORT: ${apiPort}`);
});
