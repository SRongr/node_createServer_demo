const dbUtil = require('./dbtuil')


function queryRowByLimit (offset, limit, success) {
  const querySql = "select * from stutab limit ?, ?"
  const connection = dbUtil.createConnection()
  const queryParams = [offset, limit]
  connection.connect()
  connection.query(querySql, queryParams, (err, result) => {
    if (err === null) {
      success(result)
    } else {
      console.log(err)
    }
  })
  connection.end()
}
function queryCount (success) {
  const querySql = 'select count(1) as count from stutab'
  const connection = dbUtil.createConnection()
  connection.connect()
  connection.query(querySql, (error, result) => {
    if (error === null) {
      success(result[0]['count'])
    } else {
      console.log(error)
    }
  })
  connection.end()
}

function insertStudent (params, success) {
  const ctime = new Date()
  const insertSql = "insert into stutab(name, sex, birth, ctime) value (?, ?, ?, ?)"
  const connection = dbUtil.createConnection()
  connection.connect()
  const insertParams = [...params, ctime]
  console.log(insertParams)
  console.log(insertParams)
  connection.query(insertSql, insertParams, (error, result) => {
    if (error === null) {
      console.log(result)
      success(result)
    } else {
      console.log(error)
    }
  })
  connection.end()
}
// insertStudent('dage', 2, 2000, (data) => {
//   console.log(data)
// })
// queryRowByLimit('0','5',(data)=>{console.log(data)})
module.exports = {
  queryRowByLimit,
  queryCount,
  insertStudent
}