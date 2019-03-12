const dbUtil = require('./dbUtil')

const createConnect = dbUtil.createConnect


function insertFile(params, success) {
  const insertSql = 'insert into file(file_name, file_size, file_path, stu_num) value ( ?, ?, ?, ?)'
  const connection = createConnect()
  connection.connect()
  connection.query(insertSql ,params, (error, data) => {
    if (error === null) {
      success(data)
    } else {
      throw new Error(error)
    }
  })
  connection.end()
}

module.exports = {
  insertFile,
}