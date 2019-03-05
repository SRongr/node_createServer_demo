const studentDao = require("../dao/studentDao")

function queryAllStudent (success) {
  studentDao.queryAllStudent(success)
}

// queryAllStudent()

module.exports = {
  queryAllStudent,
}