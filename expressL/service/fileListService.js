const fileDao = require('../dao/fileListDao')


function insertFile (params, success) {
  fileDao.insertFile(params, success)
}

module.exports = {
  insertFile,
}