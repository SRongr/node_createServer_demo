const stuDao = require('../dao/stuDao')

function queryRowByLimit (offset, limit, success) {
  stuDao.queryRowByLimit(offset, limit, success)
}
function queryCount (success) {
  stuDao.queryCount(success)
}
function insertStudent (params, success) {
  stuDao.insertStudent(params, success)
}
module.exports = {
  queryRowByLimit,
  queryCount,
  insertStudent
} 