const mysql = require('mysql2');
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "store"
});

db.connect((err) => {
  if(err){
    throw err;
  }
  console.log("base de datos conectada");
});

module.exports = db;