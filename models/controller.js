var dbmgr = require("./dbmgr");
var db = dbmgr.db;

class Controller {
  getStudents() {
    const sql = "SELECT * FROM students";
    const res = [];

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }

      rows.forEach((row) => {
        res.push(row);
      });
    });

    return res;
  }

  async getStudentById(id) {
    const sql = `SELECT * FROM students WHERE id = ${id}`;
    let res = [];

    const process = new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }

        const result = rows.map((row) => {
          return row;
        });

        resolve(result);
      });
    });

    return await process;
  }

  deleteStudent(id) {
    const sql = `DELETE FROM students WHERE id = ?`;

    db.run(sql, id, (err) => {
      if (err) {
        throw err;
      }

      alert("Student Deleted");
    });
  }

  addStudent(
    student_number,
    registration_number,
    student_name,
    student_level,
    student_section,
    amount,
    balance
  ) {
    const sql = `INSERT INTO students 
    (
      student_number,
      registration_number,
      student_name,
      student_level,
      student_section,
      amount,
      balance ) VALUES (?,?,?,?,?,?,?)`;

    db.run(
      sql,
      [
        student_number,
        registration_number,
        student_name,
        student_level,
        student_section,
        amount,
        balance,
      ],
      (err) => {
        if (err) {
          throw err;
        }
        alert("Student Added Successfully");
      }
    );
  }

  updateStudent(
    id,
    student_number,
    registration_number,
    student_name,
    student_level,
    student_section,
    amount,
    balance
  ) {
    const sql = `UPDATE students SET 
    student_number = ?,
    registration_number = ?,
    student_name = ?,
    student_level = ?,
    student_section = ?,
    amount = ?,
    balance = ? WHERE id = ${id}`;

    db.run(
      sql,
      [
        student_number,
        registration_number,
        student_name,
        student_level,
        student_section,
        amount,
        balance,
      ],
      (err) => {
        if (err) {
          throw err;
        }
        alert("Student Updated Successfully");
      }
    );
  }
}

module.exports = Controller;
