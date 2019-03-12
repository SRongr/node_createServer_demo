const dbUtil = require('./dbUtil')

const createConnect = dbUtil.createConnect

function queryAllStudent(success) {
  const querySql = "select * from student"
  const connection = createConnect()
  connection.connect()
  connection.query(querySql, (error, data) => {
    if (error === null) {
      success(data)
    } else {
      throw new Error(error)
    }
  })
  connection.end()
}
function insertStudent(params, success) {
  const insertSql = 'insert into student(student_num, name, class, age, math, pwd) value (?, ?, ?, ?, ?, ?)'
  const connection = createConnect()
  connection.connect()
  connection.query(insertSql ,params, (error, data) => {
    if (error === null) {
      console.log(params, data)
      success(data)
    } else {
      throw new Error(error)
    }
  })
  connection.end()
}
function login (params, success) {
  const querySql = "select * from student where student_num = ?"
  const connection = createConnect()
  connection.connect()
  connection.query(querySql, params, (error, result)=> {
    if (error === null) {
      success(result)
    } else {
      throw new error(error)
    }
  })
  connection.end()
}
module.exports = {
  queryAllStudent,
  insertStudent,
  login
}