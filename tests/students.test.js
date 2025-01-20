const request = require("supertest");
const app = require("../index");

describe("Student API Tests", () => {
  beforeAll(async () => {
    // Initialize database with a sample student
    const newStudent = { name: "Jamiu", age: 16, grade: "A1" };
    await request(app).post("/api/v1/students").send(newStudent);
  });

  it("should return all students", async () => {
    const res = await request(app).get("/api/v1/students");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it("should add a new student", async () => {
    const newStudent = { name: "Aisha", age: 20, grade: "B+" };
    const res = await request(app).post("/api/v1/students").send(newStudent);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toMatchObject(newStudent);
  });

  it("should return a single student by ID", async () => {
    const res = await request(app).get("/api/v1/students/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("id", 1);
  });

  it("should return 404 for a non-existent student", async () => {
    const res = await request(app).get("/api/v1/students/999");
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("Student not found");
  });

  it("should update an existing student", async () => {
    const updatedStudent = { name: "Jamiu Updated", age: 17, grade: "A+" };
    const res = await request(app)
      .put("/api/v1/students/1")
      .send(updatedStudent);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toMatchObject(updatedStudent);
  });

  it("should delete a student by ID", async () => {
    const res = await request(app).delete("/api/v1/students/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.message).toBe("Student deleted successfully");
  });
});
