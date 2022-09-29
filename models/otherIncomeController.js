var dbmgr = require("./dbmgr");
var db = dbmgr.db;

class Controller {
  addIncome(source, sourcenName, amount) {
    const sql = `INSERT INTO other_incomes (source, source_name, amount) VALUES (?,?,?)`;

    db.run(sql, [source, sourcenName, amount], (err) => {
      if (err) {
        throw err;
      }
      alert("Income Added Successfully");
    });
  }

  allIncomes() {
    const sql = "SELECT * FROM other_incomes";
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
}

module.exports = Controller;
