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

# Student CRUD API

A simple API to manage student records (Create, Read, Update, Delete) built with **Node.js**, **Express**, **SQLite3**, and **Unit Testing** with **Jest**. This project is Dockerized for easy deployment and development.

---

## Table of Contents

- [Student CRUD API](#student-crud-api)
  - [Table of Contents](#table-of-contents)
  - [Docker Setup](#docker-setup)
    - [Prerequisites](#prerequisites)
    - [1. Build the Docker Image](#1-build-the-docker-image)
    - [2. Run the Docker Container](#2-run-the-docker-container)
      - [Explanation of Flags:](#explanation-of-flags)
    - [3. Test the API](#3-test-the-api)
  - [Features](#features)
  - [API Endpoints](#api-endpoints)
  - [Environment Variables](#environment-variables)
  - [Unit Tests](#unit-tests)
  - [Usage](#usage)
    - [Key Notes:](#key-notes)

---

## Docker Setup

### Prerequisites

- Docker installed on your machine. [Install Docker](https://docs.docker.com/get-docker/).

---

### 1. Build the Docker Image

Clone the repository and build the Docker image:

```bash
git clone https://github.com/Confidenceb/student-crud-api.git
cd student-crud-api

# Build the Docker image
docker build -t student-crud-api:1.0.0 .
```

---

### 2. Run the Docker Container

Run the Docker container with the following command:

```bash
docker run -d -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  -e DB_PATH=/app/data/studentData.db \
  -v ./data:/app/data \
  student-crud-api:1.0.0
```

#### Explanation of Flags:

- `-d`: Run the container in detached mode (in the background).
- `-p 3000:3000`: Map port 3000 on your host to port 3000 in the container.
- `-e`: Set environment variables:
  - `PORT`: The port the API will run on (default: 3000).
  - `NODE_ENV`: The environment mode (default: production).
  - `DB_PATH`: Path to the SQLite database file (default: `/app/data/studentData.db`).
- `-v ./data:/app/data`: Persist the SQLite database file outside the container by mounting a volume.

---

### 3. Test the API

Once the container is running, you can test the API using `curl` or Postman:

```bash
# Get all students
curl http://localhost:3000/api/v1/students

# Health check
curl http://localhost:3000/healthcheck
```

---

## Features

- **CRUD Operations**: Create, Read, Update, and Delete students.
- **Input Validation**: Data validation using **Joi**.
- **Logging**: API logging with **Winston**.
- **Database Integration**: SQLite3 for persistent data storage.
- **Unit Testing**: Comprehensive unit tests with **Jest**.

---

## API Endpoints

| HTTP Method | Endpoint               | Description             |
| ----------- | ---------------------- | ----------------------- |
| GET         | `/api/v1/students`     | Get all students.       |
| GET         | `/api/v1/students/:id` | Get a student by ID.    |
| POST        | `/api/v1/students`     | Add a new student.      |
| PUT         | `/api/v1/students/:id` | Update a student by ID. |
| DELETE      | `/api/v1/students/:id` | Delete a student by ID. |

---

## Environment Variables

The following environment variables can be set when running the Docker container:

| Variable   | Description                          | Default Value              |
| ---------- | ------------------------------------ | -------------------------- |
| `PORT`     | Port the API will run on.            | `3000`                     |
| `NODE_ENV` | Environment mode (e.g., production). | `production`               |
| `DB_PATH`  | Path to the SQLite database file.    | `/app/data/studentData.db` |

---

## Unit Tests

To run the unit tests inside the Docker container:

```bash
# Build the test image
docker build -t student-crud-api-test:1.0.0 --target test .

# Run the tests
docker run student-crud-api-test:1.0.0 npm test
```

---

## Usage

You can use this API to manage students, such as:

- Adding a new student.
- Viewing, updating, or deleting existing students by ID.

---

### Key Notes:

1. **Docker-Centric**: The `README.md` focuses on Docker setup and usage, making it easy for users to get started with Docker.
2. **SQLite3**: The instructions are tailored for SQLite3, including volume mounting for database persistence.
3. **Testing**: Includes instructions for running unit tests inside a Docker container.
