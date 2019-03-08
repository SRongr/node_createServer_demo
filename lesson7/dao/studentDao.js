const dbutil = require('./dbutil')


function queryAllStudent (success) {
  const querySql = "select * from student;"
  const connection = dbutil.createConnection()
  connection.connect();
  connection.query(querySql,  (err, result) => {
    if (err === null) {
      console.log(result)
      success(result)
    } else {
      console.log(err)
    }
  })
  console.log('end')  
  connection.end();
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
function queryPWDByStudentNum (student_num, success) {
  const querySql = `select * from student where student_num = ?;`

  const connection = dbutil.createConnection()
  connection.connect();
  connection.query(querySql, student_num, (err, res) => {
    if (!err) {
      console.log(res)
      success(res)
    } else {
      console.log(err)
    }
  })
  connection.end()
}
module.exports = {
  queryAllStudent,
  queryStudentByClassAndAge,
  queryPWDByStudentNum,
}

