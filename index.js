const express = require("express");
const app = express();
app.use(express.json());

const students = [];

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.get("/api/v1/students", (req, res) => {
  res.send(students);
});

app.get("/api/v1/students/:id", (req, res) => {
  const student = students.find((c) => c.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).send("student not found");
  }
  res.send(student);
});

app.post("/api/v1/students", (req, res) => {
  const student = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age,
    grade: req.body.grade,
  };

  students.push(student);
  res.send(student);
});

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
