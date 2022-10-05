var dbmgr = require("./dbmgr");
var db = dbmgr.db;

class Controller {
  payFee(id, student_number, reg_number, department, student_name, amount) {
    console.log(department);
    const sql = `INSERT INTO feeTransactions (student_number, reg_number, department, student_name, amount) VALUES (?,?,?,?,?)`;
    const updateStudentBalance = `UPDATE students SET 
                                    balance = balance - ${amount},
                                    amount = amount + ${amount} WHERE id = ${id}`;
    let lastTxnID = 0;
    let studentBalance = 0;
    const getLastFeeTxns = `SELECT Fid from feeTransactions`;
    const getStudentBalance = `SELECT balance from students WHERE id = ${id}`;

    db.run(
      sql,
      [student_number, reg_number, department, student_name, amount],
      (err) => {
        if (err) {
          throw err;
        }
      }
    )
      .run(updateStudentBalance, (err) => {
        if (err) {
          throw err;
        }
      })
      .get(getStudentBalance, (err, row) => {
        if (err) {
          throw err;
        }
        studentBalance = row.balance;

        db.all(getLastFeeTxns, (err, rows) => {
          if (err) {
            throw err;
          }
          lastTxnID = rows.reverse()[0].Fid;

          const updateFeeBalance = `UPDATE feeTransactions SET
          balance =  ${studentBalance} WHERE Fid = ${lastTxnID}`;

          db.run(updateFeeBalance, (err) => {
            if (err) {
              throw err;
            }
            alert("Fee payment Successful");
          });
        });
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
