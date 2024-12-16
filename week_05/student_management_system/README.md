# Student Management System API

This is a student management system API built with Node.js and Express. The system allows users to manage students, courses, enrollments, and instructors. It provides endpoints for CRUD operations and user authentication.

## Features

- User authentication system
- Student management
  - Add, update, and delete students
  - Retrieve student details
- Course management
  - Add, update, and delete courses
  - Retrieve course details
- Enrollment management
  - Add and delete enrollments
  - Retrieve enrollments by student or course
- Instructor management
  - Add, update, and delete instructors
  - Retrieve instructor details

## Routes

### Student Routes

- POST /students/register - Register a new student
- GET /students/all - List all students
- GET /students/:id - Get a student by ID
- PUT /students/update/:id - Update a student by ID
- DELETE /students/delete/:id - Delete a student by ID

### Course Routes

- POST /courses/add - Add a new course
- GET /courses - List all courses
- GET /courses/:id - Get a course by ID
- PUT /courses/update/:id - Update a course by ID
- DELETE /courses/delete/:id - Delete a course by ID

### Enrollment Routes

- POST /enrollments/add - Add a new enrollment
- GET /enrollments/student/:id - List all enrollments for a student
- GET /enrollments/course/:id - List all enrollments for a course
- DELETE /enrollments/delete/:id - Delete an enrollment by ID

### Instructor Routes

- POST /instructors/add - Add a new instructor
- GET /instructors - List all instructors
- GET /instructors/:id - Get an instructor by ID
- PUT /instructors/update/:id - Update an instructor by ID
- DELETE /instructors/delete/:id - Delete an instructor by ID

## Technologies Used

- Node.js
- Express
- Mongoose (for MongoDB)
- JSON Web Tokens (for authentication)
- dotenv (for environment variables)

## How to Run

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with the necessary environment variables (e.g., `dbURI`, `PORT`)
4. Run `npm start`
5. Open the browser and go to `http://localhost:<PORT>`

## Error Handling

- The application uses a centralized error handling middleware to manage errors consistently across the API.

## License

This project is licensed under the ISC License.
