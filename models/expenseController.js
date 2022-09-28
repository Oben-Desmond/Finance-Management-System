var dbmgr = require("./dbmgr");
var db = dbmgr.db;
const income = { id: 0, timestamp: '', description: '', person: "", amount: 0, name: "" };
const budget = { description: "", name: "", amount: "" }

class Controller {
    totalIncomeExpenses() {
        const sql = "SELECT * FROM expenses";
        let res = [income];
        let sum = 0;

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                }

                res = rows.map((row, index) => {
                    return ({
                        amount: row.amount,
                        description: row.description,
                        id: row.id,
                        person: row.person,
                        timestamp: row.timestamp,
                        name: row.name
                    })
                });
                resolve(res)

            });
        })


    }

    addIncomeExpense(inputIncome = income) {

        const { id, description, name, person, amount } = inputIncome;

        const sql = `INSERT INTO expenses ( description, name, person, amount)
        VALUES (?,?,?,?)`;
        const res = [];

        db.run(sql, [description, name, person, amount], (err, rows) => {
            if (err) {
                throw err;
            }

        });

        return res;
    }

    addBudgetHeadIncome(budgetInput = budget) {
        const sql = `INSERT INTO budget_head ( description, name, amount)
        VALUES ('${budgetInput.description}','${budgetInput.name}', '${budgetInput.amount}'); `;

        return new Promise((res, rej) => {
            db.run(sql, [], (err, rows) => {
                if (err) {
                    rej(err);
                }

                res("successfull")

            });
        })

    }

    getBudgetData() {
        const sql = "SELECT * FROM budget_head";
        let res = [income];

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                }

                res = rows.map((row, index) => {
                    return ({
                        amount: row.amount,
                        description: row.description,
                        id: row.id,
                        name: row.name,
                    })
                });
                resolve(res)

            });
        })
    }
    getBudgetHeadById(id) {
        const sql = `SELECT * FROM budget_head WHERE id=${id}`;
        let res = [];

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                }

                res = rows.map((row, index) => {
                    return ({
                        amount: row.amount,
                        description: row.description,
                        id: row.id,
                        name: row.name,
                    })
                });
                resolve(res)

            });
        })
    }

    updateBudgetHead(
        id,
        name,
        description,
        amount

    ) {
        const sql = `UPDATE budget_head SET 
        name = ?,
        description = ?,
        amount = ?
        WHERE id = ${id}`;

        return (new Promise((resolve, reject) => {
            db.run(
                sql,
                [
                    name,
                    description,
                    amount,
                ],
                (err) => {
                    if (err) {
                        alert(id)
                        reject(err);
                    }
                    resolve("Student Updated Successfully");
                }
            );
        }))
    }

    deleteBudgetHead(id) {
        const sql = `DELETE FROM budget_head WHERE id = ?`;

        db.run(sql, id, (err) => {
            if (err) {
                throw err;
            }
        });
    }

}

module.exports = Controller;
