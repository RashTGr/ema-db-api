# RESTful API for School Management System

## Description
This API was built to manage SQL queries for a simple school management system in accordance with RESTful principles, by employing HTTP methods to carry out CRUD operations on resources with unique identifiers (URIs).

## Functional Requirements
The API gives admins, teachers and students access to course enrolment data. The API enables users to view courses, enroll in courses, pass/fail students, and manage course availability.

```bash
- Admins should be able to enable or disable the availability of a course
- Admins should be able to assign one or more courses to a teacher
- Students can browse and list all the available courses and see the course title and course teacher’s name.
- Students can enrol in a course. Students should not be able to enrol in a course more than once at each time.
- Teachers can fail or pass a student.
- Only authorised access can perform an action. For example, only teachers can pass/fail a student.
```


## Technologies Used
- Node JS
- Express JS
- mysql2


## Installation
1. Clone the repository:
```bash
git clone https://github.com/rashtgr/ema-db-api.git

cd ema-db-api
```

2. Install project dependencies:
```bash
npm install
```

3. Import the **mydb** file to configure the database.

4. The API requires a MySQL database for storing course and user information. Update the **config/db.js** file with your databse credentilas. To avoid any issue with database conection follow single line argument approach as it is.


## Usage
5. Start the server:

```bash
node server.js
```

## Endpoints
The API provides the following role-based endpoints and you can test them using **Postman**:

#### Admin role
- Update course availability - **PUT: http://{{your localhost URL}}/admin/courses/`courseID`/availability**
- Assign course to a teacher - **PUT: http://{{your localhost URL}}/admin/courses/teacher** and for the body field use the following two key-value pairs in JSON:
```bash
{
    "teacherID": ?,
    "courseID": ?
}
```

#### Teacher role
- Pass/Fail students - **PUT: http://{{your localhost URL}}/teacher/courses/marks** and for the body field use the following three key-value pairs in JSON:
```bash
{
    "userID": ?,
    "courseID": ?,
    "mark": ?
}
```
- All assigned courses - **GET: http://{{your localhost URL}}/teacher/`teacherID`/courses**


#### Student role
- Browse all available courses - **GET: http://{{your localhost URL}}/student/courses**
- Enrol in a course - **POST: http://{{your localhost URL}}/student/enrol** and for the body field use the following two key-value pairs in JSON:
```bash
{
    "courseId": ?,
    "userId": ?
}
```

## Access Control
For the role-based access control **API key** security method is used. The following key-value pairs should be configured in the Postman headers for each role:

- Admin   -  a. KEY: **`api-key`** => VALUE: **`authAdmin`**
             b. KEY: **`roleid`**  => VALUE: **`roleid-1`**

- Teacher -  a. KEY: **`api-key`** => VALUE: **`authTeacher`**
             b. KEY: **`roleid`**  => VALUE: **`roleid-2`**

- Student -  a. KEY: **`api-key`** => VALUE: **`authStudent`**
             b. KEY: **`roleid`**  => VALUE: **`roleid-3`**


## Contribution 
If you have any suggestions for how we can better improve this project, we'd love to hear them.


## Contributors
- `Rashad Gurbanli`
- `Tawfiq Ibn Umar`
- `Dottie Mulenga Chabala`
