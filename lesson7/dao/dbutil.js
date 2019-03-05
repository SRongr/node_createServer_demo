const mysql = require("mysql")

const connection = mysql.createConnection({
  hsot: "127.0.0.1",
  port: "3306",
  user: "root",
  password: '123',
  database: 'school'
})

module.exports = connection