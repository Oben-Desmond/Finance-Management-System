var dbmgr = require("./dbmgr");
var db = dbmgr.db;

class Controller {
  totalIncome() {
    const sql = "SELECT amount FROM students";
    const res = [];
    let sum = 0;

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }

      rows.forEach((row) => {
        sum = sum + row.amount;
      });
      res.push(sum);
    });

    return res;
  }

  totalFeeIncome() {
    const sql = "SELECT amount FROM students";
    const res = [];
    let sum = 0;

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }

      rows.forEach((row) => {
        sum = sum + row.amount;
      });
      res.push(sum);
    });

    return res;
  }

  otherIncomeTotal() {
    const sql = "SELECT amount FROM other_incomes";
    const res = [];
    let sum = 0;

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }

      rows.forEach((row) => {
        sum = sum + row.amount;
      });
      res.push(sum);
    });

    return res;
  }
}

module.exports = Controller;
