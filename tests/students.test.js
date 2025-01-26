const request = require("supertest");
const app = require("../index");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "testStudentData.db");
let db;

describe("Student API Tests", () => {
  // Test data
  const testStudent = {
    name: "Test Student",
    age: 20,
    grade: "A",
  };

  beforeAll((done) => {
    // First connect to database
    db = new sqlite3.Database(
      dbPath,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      async (err) => {
        if (err) {
          console.error("Error connecting to test database:", err);
          done(err);
          return;
        }

        try {
          // Clear the database first
          await new Promise((resolve, reject) => {
            db.run("DELETE FROM Students", [], (err) => {
              if (err) reject(err);
              else resolve();
            });
          });

          // Reset the auto-increment
          await new Promise((resolve, reject) => {
            db.run(
              "DELETE FROM sqlite_sequence WHERE name='Students'",
              [],
              (err) => {
                if (err) reject(err);
                else resolve();
              }
            );
          });

          // Insert test student
          await new Promise((resolve, reject) => {
            db.run(
              "INSERT INTO Students (name, age, grade) VALUES (?, ?, ?)",
              [testStudent.name, testStudent.age, testStudent.grade],
              function (err) {
                if (err) reject(err);
                else {
                  testStudent.id = this.lastID;
                  resolve();
                }
              }
            );
          });

          done();
        } catch (error) {
          console.error("Error in test setup:", error);
          done(error);
        }
      }
    );
  });

  // Test GET all students
  it("should return all students", async () => {
    const res = await request(app).get("/api/v1/students");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
  });

  // Test POST new student
  it("should add a new student", async () => {
    const newStudent = {
      name: "New Student",
      age: 18,
      grade: "B",
    };
    const res = await request(app).post("/api/v1/students").send(newStudent);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toMatchObject(newStudent);
  });

  // Test GET student by ID
  it("should return a single student by ID", async () => {
    const res = await request(app).get(`/api/v1/students/${testStudent.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toMatchObject(testStudent);
  });

  // Test GET non-existent student
  it("should return 404 for a non-existent student", async () => {
    const res = await request(app).get("/api/v1/students/999");
    expect(res.statusCode).toBe(404);
  });

  // Test PUT update student
  it("should update an existing student", async () => {
    const updatedStudent = {
      name: "Updated Student",
      age: 21,
      grade: "A+",
    };
    const res = await request(app)
      .put(`/api/v1/students/${testStudent.id}`)
      .send(updatedStudent);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toMatchObject({
      id: testStudent.id,
      ...updatedStudent,
    });
  });

  // Test DELETE student
  it("should delete a student by ID", async () => {
    const res = await request(app).delete(`/api/v1/students/${testStudent.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.message).toBe("Student deleted successfully");
  });

  afterAll((done) => {
    if (db) {
      db.run("DELETE FROM Students", [], (err) => {
        if (err) console.error("Error clearing database:", err);
        db.close((err) => {
          if (err) console.error("Error closing database:", err);
          done();
        });
      });
    } else {
      done();
    }
  });
});
