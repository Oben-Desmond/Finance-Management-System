var dbmgr = require("./dbmgr");
var db = dbmgr.db;

class Controller {
  allExpenditures() {
    const sql = "SELECT * FROM expenditure";
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

  addExpenditure(department, category, amount, issuedTo) {
    const sql = `INSERT INTO expenditure (department, category, amount, issuedTo) VALUES (?,?,?,?)`;
    const balanceUpdate = `UPDATE departments SET balance = balance - ${amount} WHERE department_name LIKE '%${department}%'`;

    db.run(sql, [department, category, amount, issuedTo]).run(
      balanceUpdate,
      (err) => {
        if (err) {
          throw err;
        }
        alert("Expenditure registered Successfully");
      }
    );
  }
}

module.exports = Controller;
