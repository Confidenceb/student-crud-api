<!-- # Student CRUD API

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
Viewing, updating, or deleting existing students by ID. -->

# A simple API to manage student records (Create, Read, Update, Delete) built with Node.js, Express, PostgreSQL, and Unit Testing with Jest.

## Table of Contents

#### Installation

#### Features

#### API Endpoints

#### Dependencies

#### Environment Variables

#### Unit Tests

#### 12-Factor App Principles

#### Usage

#### Docker Setup

### Installation

Follow these steps to install and run the project locally:

1. Clone the Repository
   git clone <repo-url>
   cd student-crud-api

2. Install Dependencies
   npm install

3. Start the Server
   npm start

   The API will be running at http://localhost:3000

### Features

CRUD Operations: Create, Read, Update, and Delete students.

Input Validation: Data validation using Joi.

Logging: API logging with Winston.

Database Integration: SQLite3 for persistent data storage.

Unit Testing: Comprehensive unit tests with Jest.

### API Endpoints

HTTP Method Endpoint Description
GET /api/v1/students - Get all students
GET /api/v1/students/:id - Get a student by ID
POST /api/v1/students - Add a new student
PUT /api/v1/students/:id - Update a student by ID
DELETE /api/v1/students/:id - Delete a student by ID

### Dependencies

express: Web framework for building the API.

nodemon: Automatically restart the server on code changes.

joi: Data validation library.

winston: Logging library.

sqlite3: SQLite database client for Node.js.

jest: Testing framework.

### Environment Variables

#### Create a .env file in the root directory with the following variables:

PORT=3000
NODE_ENV=development
DB_PATH=./data/studentData.db

#### DB_PATH: Path to the SQLite database file. Defaults to ./data/studentData.db

### Unit Tests

To run the unit tests: npm test
Tests include verifying CRUD operations for students.

### 12-Factor App Principles

Codebase: One codebase for the project.
Dependencies: Managed via package-lock.json.
Config: Configurations like port are stored in environment variables.
Backing Services: PostgreSQL used as the database.
Logs: Logs are handled by Winston for better efficiency.

### Usage

You can use this API to manage students, such as:
Adding a new student.
Viewing, updating, or deleting existing students by ID.

### Docker Setup

1. Build the Docker Image
   docker build -t student-crud-api:1.0.0 .
2. Run the Docker Container
   docker run -d -p 3000:3000 \
   -e PORT=3000 \
   -e NODE_ENV=production \
   -e DB_PATH=/app/data/studentData.db \
   -v ./data:/app/data \
   student-crud-api:1.0.0
3. Verify the Container
   docker logs <container_id_or_name>

4.Test the API
curl http://localhost:3000/api/v1/students
