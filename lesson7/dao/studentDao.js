const connection = require('./dbutil')
connection.connect();
function queryAllStudent (success) {
  const querySql = "select * from student;"
  // connection.connect();
  connection.query(querySql,  (err, result) => {
    if (err === null) {
      console.log(result)
      success(result)
    } else {
      console.log(err)
    }
  })
  console.log('end')  
  // connection.end();
}
function queryStudentByClassAndAge (classNum, age) {
  const querySql = `select * from student where class = ? and age = ?;`
  // connection.connect()
  connection.query(querySql, [...arguments], (err, res) => {
    if (!err) {
      console.log(res)
    } else {
      console.log(err)
    }
  })
  // connection.end();
}

module.exports = {
  queryAllStudent,
  queryStudentByClassAndAge,
}

