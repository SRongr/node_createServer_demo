const dbUtil = require('./dbUtil')

const createConnect = dbUtil.createConnect

function queryArticleDetails(params,success) {
  const querySql = "select * from blog where id = ?"
  const connection = createConnect()
  connection.connect()
  connection.query(querySql, params, (error, data) => {
    if (error === null) {
      success(data)
    } else {
      throw new Error(error)
    }
  })
  connection.end()
}
function queryAllArticles (success) {
  const querySql = "select * from blog"
  const connection = createConnect()
  connection.connect()
  connection.query(querySql, (error, result)=> {
    if (error === null) {
      success(result)
    } else {
      throw new Error(error)
    }
  })
  connection.end()
}
function updateArticle (paramsArr, success) {
  const querySql = "UPDATE `my_blog`.`blog` SET `title` = ?, `content` = ?, `tags` = ?, `utime` = ? WHERE (`id` = ?);"
  const connection = createConnect()
  connection.connect()
  connection.query(querySql,paramsArr, (error, result)=> {
    if (error === null) {
      success(result)
    } else {
      throw new Error(error)
    }
  })
  connection.end()
}
function addArticle (paramsArr, success) {
  console.log(paramsArr)
  const querySql = "INSERT INTO `my_blog`.`blog` (`title`, `content`, `views`, `tags`, `ctime`, `utime`) VALUES (?, ?, '0', ?, ?, ?)"
  const connection = createConnect()
  connection.connect()
  connection.query(querySql,paramsArr, (error, result)=> {
    if (error === null) {
      success(result)
    } else {
      throw new Error(error)
    }
  })
  connection.end()
}
function delateArticle (params, success) {
  const querySql = 'DELETE FROM `my_blog`.`blog` WHERE (`id` = ?)'
  const connection = createConnect()
  connection.connect()
  connection.query(querySql,params, (error, result)=> {
    if (error === null) {
      success(result)
    } else {
      throw new Error(error)
    }
  })
  connection.end()
}

module.exports = {
  queryArticleDetails,
  queryAllArticles,
  updateArticle,
  addArticle,
  delateArticle
}