const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "testStudentData.db");

beforeAll((done) => {
  const db = new sqlite3.Database(
    dbPath,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error("Error connecting to test database:", err);
        done(err);
        return;
      }

      // Create the Students table
      const sql = `
      CREATE TABLE IF NOT EXISTS Students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL CHECK(age >= 15),
        grade TEXT NOT NULL
      )`;

      db.run(sql, (err) => {
        if (err) {
          console.error("Error creating test table:", err);
          done(err);
          return;
        }

        // Reset the auto-increment sequence
        db.run(
          "DELETE FROM sqlite_sequence WHERE name='Students'",
          [],
          (err) => {
            if (err) {
              console.error("Error resetting sequence:", err);
            }

            db.close((err) => {
              if (err) console.error("Error closing database:", err);
              done();
            });
          }
        );
      });
    }
  );
});

jest.setTimeout(10000); // Increase timeout to 10 seconds
