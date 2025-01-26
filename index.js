const express = require("express");
const app = express();
const Joi = require("joi");
require("dotenv").config();
const logger = require("./logger");
const sqlite3 = require("sqlite3").verbose();
let sql;

app.use(express.json());

const students = [];

// Define the Joi validation schema
const studentSchema = Joi.object({
  name: Joi.string().min(3).required(),
  age: Joi.number().min(15).required(),
  grade: Joi.string().required(),
});

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Get all student data
// app.get("/api/v1/students", (req, res) => {
//   res.send(students);
// });

app.get("/api/v1/students", (req, res) => {
  const sql = `SELECT * FROM Students`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      logger.error("Error fetching students:", err.message);
      return res.status(500).send("Error fetching students");
    }
    res.send({
      success: true,
      data: rows,
    });
  });
});

// Get student by ID
// app.get("/api/v1/students/:id", (req, res) => {
//   const student = students.find((c) => c.id === parseInt(req.params.id));
//   // if (isNaN(id)) {
//   //   return res.status(400).send("Invalid ID format");
//   // }
//   if (!student) {
//     return res.status(404).send("student not found");
//   }
//   res.send(student);
// });

app.get("/api/v1/students/:id", (req, res) => {
  const sql = `SELECT * FROM Students WHERE id = ?`;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      logger.error("Error fetching student:", err.message);
      return res.status(500).send("Error fetching student");
    }
    if (!row) {
      return res.status(404).send("Student not found");
    }
    res.send({
      success: true,
      data: row,
    });
  });
});

// Health checkpoint

app.get("/healthcheck", (req, res) => {
  res.send({
    status: "UP",
    timestamp: new Date(),
  });
});

// Add student data
// app.post("/api/v1/students", (req, res) => {
//   const schema = Joi.object({
//     name: Joi.string().min(3).required(),
//     age: Joi.number().min(15).required(),
//     grade: Joi.string().required(),
//   });

//   //   const { error, value } = schema.validate(req.body);
//   const { error, value } = schema.validate(req.body, { convert: false });

//   if (error) {
//     // Handle the validation error
//     logger.warn(`Validation failed: ${error.details[0].message}`);
//     res.status(400).send(error.details[0].message);
//     return;
//   }

//   //   res.send("Validation successful!");

//   const student = {
//     id: students.length + 1,
//     name: req.body.name,
//     age: req.body.age,
//     grade: req.body.grade,
//   };

//   students.push(student);
//   // res.send(student);
//   logger.info(`Student added: ${JSON.stringify(student)}`);
//   res.send({
//     success: true,
//     message: "Student successfully added",
//     data: student,
//   });
// });

app.post("/api/v1/students", (req, res) => {
  // Validate input
  const { error } = studentSchema.validate(req.body, { convert: false });
  if (error) {
    logger.warn(`Validation failed: ${error.details[0].message}`);
    return res.status(400).send(error.details[0].message);
  }

  const { name, age, grade } = req.body;
  const sql = `INSERT INTO Students (name, age, grade) VALUES(?, ?, ?)`;
  db.run(sql, [name, age, grade], function (err) {
    if (err) {
      logger.error("Error inserting student:", err.message);
      return res.status(500).send("Error inserting student");
    }
    res.status(201).send({
      success: true,
      message: "Student successfully added",
      data: { id: this.lastID, name, age, grade },
    });
  });
});

// Edit existing student data
app.put("/api/v1/students/:id", (req, res) => {
  // Validate input
  const { error } = studentSchema.validate(req.body, { convert: false });
  if (error) {
    logger.warn(`Validation failed: ${error.details[0].message}`);
    return res.status(400).send(error.details[0].message);
  }

  const { name, age, grade } = req.body;
  const { id } = req.params;

  // Check if the student exists
  const findStudentSql = `SELECT * FROM Students WHERE id = ?`;
  db.get(findStudentSql, [id], (err, row) => {
    if (err) {
      logger.error("Error fetching student:", err.message);
      return res.status(500).send("Error fetching student");
    }
    if (!row) {
      return res.status(404).send("Student not found");
    }

    // Update the student
    const updateSql = `UPDATE Students SET name = ?, age = ?, grade = ? WHERE id = ?`;
    db.run(updateSql, [name, age, grade, id], function (err) {
      if (err) {
        logger.error("Error updating student:", err.message);
        return res.status(500).send("Error updating student");
      }
      res.send({
        success: true,
        message: "Student updated successfully",
        data: { id: parseInt(id), name, age, grade },
      });
    });
  });
});

// Delete existing student data

app.delete("/api/v1/students/:id", (req, res) => {
  const { id } = req.params;

  // Check if the student exists
  const findStudentSql = `SELECT * FROM Students WHERE id = ?`;
  db.get(findStudentSql, [id], (err, row) => {
    if (err) {
      logger.error("Error fetching student:", err.message);
      return res.status(500).send("Error fetching student");
    }
    if (!row) {
      return res.status(404).send("Student not found");
    }

    // Delete the student
    const deleteSql = `DELETE FROM Students WHERE id = ?`;
    db.run(deleteSql, [id], function (err) {
      if (err) {
        logger.error("Error deleting student:", err.message);
        return res.status(500).send("Error deleting student");
      }
      res.send({
        success: true,
        message: "Student deleted successfully",
      });
    });
  });
});

// Logger

app.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.send("Welcome to the API!");
});

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send("Something went wrong!");
});

// Connect to DB
// const db = new sqlite3.Database(
//   "./studentData.db",
//   sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
//   (err) => {
//     if (err) {
//       console.error("Error connecting to database:", err.message);
//     } else {
//       console.log("Connected to the SQLite database.");
//     }
//   }
// );

// Create Table
// sql = `CREATE TABLE IF NOT EXISTS Students (id INTEGER PRIMARY KEY, name TEXT NOT NULL, age INTEGER NOT NULL CHECK(age >= 15), grade TEXT NOT NULL)`;
// sql = `CREATE TABLE Students (id INTEGER PRIMARY KEY, name TEXT NOT NULL, age INTEGER NOT NULL CHECK(age >= 15), grade TEXT NOT NULL)`;

// db.run(sql);

// Insert
// sql = `INSERT INTO  Students (name, age, grade) VALUES(?, ?, ?)`;
// db.run(sql, ["Olix", 26, "A+"], (err) => {
//   if (err) console.log(err.message);
// });

// Query
// sql = "SELECT * FROM Students";
// db.all(sql, [], (err, rows) => {
//   if (err) {
//     console.log(err.message);
//     return;
//   }
//   rows.forEach((row) => {
//     console.log(row);
//   });
// });

// Update

// sql = `UPDATE Students SET name = ? WHERE id = ?`;

// Drop
// db.run("DROP TABLE students");

// Connect to DB
// const db = new sqlite3.Database(
//   "./studentData.db",
//   sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
//   (err) => {
//     if (err) {
//       logger.error("Error connecting to database:", err.message); // Log an error
//     } else {
//       logger.info("Connected to the SQLite database."); // Log successful connection
//     }
//   }
// );

const dbPath =
  process.env.NODE_ENV === "test" ? "./testStudentData.db" : "./studentData.db";

const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      logger.error("Error connecting to database:", err.message);
    } else {
      logger.info("Connected to the SQLite database.");
      // Create table after successful connection
      createTable();
    }
  }
);

// Create Table
const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS Students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL CHECK(age >= 15),
      grade TEXT NOT NULL
    )`;
  db.run(sql, (err) => {
    if (err) {
      logger.error("Error creating table:", err.message);
    } else {
      logger.info("Students table ready.");
    }
  });
};

// Insert a Student
const insertStudent = (name, age, grade) => {
  const sql = `INSERT INTO Students (name, age, grade) VALUES(?, ?, ?)`;
  db.run(sql, [name, age, grade], function (err) {
    if (err) {
      logger.error("Error inserting data:", err.message); // Log insertion error
    } else {
      logger.info(`Student added with ID: ${this.lastID}`); // Log success
    }
  });
};

// Query All Students
const getAllStudents = () => {
  const sql = `SELECT * FROM Students`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      logger.error("Error fetching data:", err.message); // Log query error
    } else {
      logger.info("Students fetched successfully."); // Log success
      rows.forEach((row) => {
        logger.info(JSON.stringify(row)); // Log each student
      });
    }
  });
};

// // Example Usage
// createTable();
// insertStudent("John Doe", 20, "A");
// getAllStudents();

// dropTable();

// Close the database connection
// db.close((err) => {
//   if (err) {
//     console.error("Error closing the database:", err.message);
//   } else {
//     console.log("Database connection closed.");
//   }
// });

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

// Process cleanup
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      logger.error("Error closing the database:", err.message);
    } else {
      logger.info("Database connection closed.");
    }
    process.exit(0);
  });
});

module.exports = app;
