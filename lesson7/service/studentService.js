const studentDao = require("../dao/studentDao")

function queryAllStudent (success) {
  studentDao.queryAllStudent(success)
}
function queryPWDByStudentNum (student_num, success) {
  studentDao.queryPWDByStudentNum(student_num, success)
}
// queryAllStudent()

module.exports = {
  queryAllStudent,
  queryPWDByStudentNum,
}