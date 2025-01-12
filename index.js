const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

const students = [
  {
    id: 1,
    name: "John Doe",
    age: 21,
    grade: "A",
  },
  {
    id: 2,
    name: "Alex Smith",
    age: 20,
    grade: "B",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Get all student data
app.get("/api/v1/students", (req, res) => {
  res.send(students);
});

// Get student by ID
app.get("/api/v1/students/:id", (req, res) => {
  const student = students.find((c) => c.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).send("student not found");
  }
  res.send(student);
});

// Add student data
app.post("/api/v1/students", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().min(15).required(),
    grade: Joi.string().required(),
  });

  //   const { error, value } = schema.validate(req.body);
  const { error, value } = schema.validate(req.body, { convert: false });

  if (error) {
    // Handle the validation error
    res.status(400).send(error.details[0].message);
    return;
  }

  //   res.send("Validation successful!");

  const student = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age,
    grade: req.body.grade,
  };

  students.push(student);
  // res.send(student);
  res.send({
    success: true,
    message: "Student successfully added",
    data: student,
  });
});

// Edit existing student data
app.put("/api/v1/students/:id", (req, res) => {
  // Look for student
  const student = students.find((c) => c.id === parseInt(req.params.id));
  // If not found, return 404 -Student not found
  if (!student) {
    return res.status(404).send("student not found");
  }
  // Validate
  const schema = Joi.object({
    name: Joi.string().min(3),
    age: Joi.number().min(15),
    grade: Joi.string(),
  });

  //   const { error, value } = schema.validate(req.body);
  const { error, value } = schema.validate(req.body, { convert: false });
  // If not valid, return 400 - bad request
  if (error) {
    // Handle the validation error
    res.status(400).send(error.details[0].message);
    return;
  }
  // Update student
  student.name = req.body.name;
  student.age = req.body.age;
  student.grade = req.body.grade;
  // Return updated student
  res.send(student);
});
// Delete existing student data

app.delete("/api/v1/students/:id", (req, res) => {
  const student = students.find((c) => c.id === parseInt(req.params.id));

  // If not found, return 404 - Student not found
  if (!student) {
    return res.status(404).send("Student not found");
  }

  // Remove student from the array
  const index = students.indexOf(student);
  students.splice(index, 1);

  // res.send(student);
  res.send({
    success: true,
    message: "Student successfully deleted",
    data: student,
  });
});

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
