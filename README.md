# Student CRUD API

### A simple API to manage student records (Create, Read, Update, Delete) built with Node.js, Express, PostgreSQL, and Unit Testing with Jest

Table of Contents
Installation
Features
API Endpoints
Dependencies
Environment Variables
Unit Tests
12-Factor App Principles
Usage
Installation
Follow these steps to install and run the project locally:

bash
Copy
Edit

### Clone the repository

git clone <repo-url>

### Install dependencies

npm install

### Start the server

npm start

### Features

Create, Read, Update, and Delete students.
Input validation with Joi.
API logging with Winston.
PostgreSQL database integration.
Unit testing with Jest.

### API Endpoints

HTTP Method Endpoint Description
GET /api/v1/students - Get all students
GET /api/v1/students/:id - Get a student by ID
POST /api/v1/students - Add a new student
PUT /api/v1/students/:id - Update a student by ID
DELETE /api/v1/students/:id - Delete a student by ID

### Dependencies

express: Web framework for building the API.
nodemon: Automatically restart server on code changes.
joi: Data validation library.
winston: Logging library.
pg: PostgreSQL client for Node.js.
jest: Testing framework.
Environment Variables
PORT: Port on which the API will run (default is 3000).
Unit Tests
To run the tests:

bash
Copy
Edit

### Run the tests

npm test
Unit tests include verifying CRUD operations for students.

12-Factor App Principles
Codebase: One codebase for the project.
Dependencies: Managed via package-lock.json.
Config: Configurations like port are stored in environment variables.
Backing Services: PostgreSQL used as the database.
Logs: Logs are handled by Winston for better efficiency.
Usage
You can use this API to manage students, such as:

Adding a new student.
Viewing, updating, or deleting existing students by ID.
