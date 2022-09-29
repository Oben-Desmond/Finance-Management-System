var dbmgr = require("./dbmgr");
var db = dbmgr.db;

class Controller {
  allDepartments() {
    const sql = "SELECT * FROM departments";
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

  async getDepartmentById(id) {
    const sql = `SELECT * FROM departments WHERE Did = ${id}`;
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

  addDepartment(dept_name, dept_desc, fee_amount) {
    const sql = `INSERT INTO departments (dept_name, dept_desc, fee_amount) VALUES (?,?,?)`;

    db.run(sql, [dept_name, dept_desc, fee_amount], (err) => {
      if (err) {
        throw err;
      }
      alert("Department Added Successfully");
    });
  }

  updateDepartment(id, dept_name, dept_desc, fee_amount) {
    const sql = `UPDATE departments SET 
    dept_name = ?,
    dept_desc = ?,
    fee_amount = ? WHERE Did = ${id}`;

    db.run(sql, [dept_name, dept_desc, fee_amount], (err) => {
      if (err) {
        throw err;
      }
      alert("Department Updated Successfully");
    });
  }

  deleteDepartment(id) {
    const sql = `DELETE FROM departments WHERE Did = ?`;

    db.run(sql, id, (err) => {
      if (err) {
        throw err;
      }

      alert("Department Deleted");
    });
  }
}

module.exports = Controller;
