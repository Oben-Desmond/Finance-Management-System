var dbmgr = require("./dbmgr");
var db = dbmgr.db;

class Controller {
  payFee(id, student_number, reg_number, student_name, amount) {
    const sql = `INSERT INTO feeTransactions (student_number, reg_number, student_name, amount) VALUES (?,?,?,?)`;
    const updateStudentBalance = `UPDATE students SET 
                                    balance = balance - ${amount},
                                    amount = amount + ${amount} WHERE id = ${id}`;

    db.run(sql, [student_number, reg_number, student_name, amount], (err) => {
      if (err) {
        throw err;
      }
    }).run(updateStudentBalance, (err) => {
      if (err) {
        throw err;
      }
      alert("Fee payment Successful");
    });
  }

  allFeeTransactions() {
    const sql = "SELECT * FROM feeTransactions";
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
