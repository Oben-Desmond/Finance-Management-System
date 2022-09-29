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
    amount
  ) {
    const sql = `INSERT INTO students 
    (
      student_number,
      registration_number,
      student_name,
      student_level,
      student_section,
      amount) VALUES (?,?,?,?,?,?)`;
    let deptFee = 0;
    const getFee = `SELECT fee_amount FROM departments WHERE dept_name LIKE '%${student_section}%'`;
    const recordFeePayment = `INSERT INTO feeTransactions (student_number, reg_number, student_name, amount) 
                  VALUES (?,?,?,?)`;

    db.serialize(() => {
      db.run(
        sql,
        [
          student_number,
          registration_number,
          student_name,
          student_level,
          student_section,
          amount,
        ],
        (err) => {
          if (err) {
            throw err;
          }
        }
      )
        .get(getFee, (err, row) => {
          if (err) {
            throw err;
          }
          deptFee = row.fee_amount;

          const updateBalance = `UPDATE students SET balance = ${
            deptFee - amount
          } WHERE student_number = ${student_number}`;

          db.run(updateBalance, (err) => {
            if (err) {
              throw err;
            }
          });
        })
        .run(
          recordFeePayment,
          [student_number, registration_number, student_name, amount],
          (err) => {
            if (err) {
              throw err;
            }
            alert("Student Added Successfully");
          }
        );
    });
  }

  updateStudent(
    id,
    student_number,
    registration_number,
    student_name,
    student_level,
    student_section
  ) {
    const sql = `UPDATE students SET 
    student_number = ?,
    registration_number = ?,
    student_name = ?,
    student_level = ?,
    student_section = ? WHERE id = ${id}`;

    db.run(
      sql,
      [
        student_number,
        registration_number,
        student_name,
        student_level,
        student_section,
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
