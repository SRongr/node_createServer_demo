const stuDao = require('../dao/stuDao')

function queryAllStudent (success) {
  console.log(success, 'sevivce')
  stuDao.queryAllStudent(success)
}
function insertStudent (params, success) {
  stuDao.insertStudent(params, success)
}

function login (params, success) {
  stuDao.login(params, success)
}
module.exports = {
  queryAllStudent,
  insertStudent,
  login
}