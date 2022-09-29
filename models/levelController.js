var dbmgr = require("./dbmgr");
var db = dbmgr.db;

class Controller {
  addLevel(level_name) {
    const sql = `INSERT INTO levels (level_name) VALUES (?)`;

    db.run(sql, [level_name], (err) => {
      if (err) {
        throw err;
      }
      alert("Level Added Successfully");
    });
  }

  allLevels() {
    const sql = "SELECT * FROM levels";
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
