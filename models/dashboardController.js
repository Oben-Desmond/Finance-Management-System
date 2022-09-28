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

  runningCost() {
    const sql = "SELECT running_cost FROM departments";
    const res = [];
    let sum = 0;

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }

      rows.forEach((row) => {
        sum = sum + row.running_cost;
      });
      res.push(sum);
    });

    return res;
  }

  runningCostBalance() {
    const sql = "SELECT balance FROM departments";
    const res = [];
    let sum = 0;

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }

      rows.forEach((row) => {
        sum = sum + row.balance;
      });
      res.push(sum);
    });

    return res;
  }
}

module.exports = Controller;
