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

  addDepartment(department_name, description, running_cost, balance) {
    const sql = `INSERT INTO departments (department_name, description, running_cost, balance ) VALUES (?,?,?,?)`;

    db.run(
      sql,
      [department_name, description, running_cost, balance],
      (err) => {
        if (err) {
          throw err;
        }
        alert("Department Added Successfully");
      }
    );
  }

  updateDepartment(id, department_name, description, running_cost, balance) {
    const sql = `UPDATE departments SET 
    department_name = ?,
    description = ?,
    running_cost = ?,
    balance = ? WHERE Did = ${id}`;

    db.run(
      sql,
      [department_name, description, running_cost, balance],
      (err) => {
        if (err) {
          throw err;
        }
        alert("Department Updated Successfully");
      }
    );
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
