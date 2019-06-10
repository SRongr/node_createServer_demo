const blogDao = require('../dao/blogDao')

function queryArticleDetails (params,success) {
  blogDao.queryArticleDetails(params,success)
}
function queryAllArticles (params, success) {
  blogDao.queryAllArticles(params, success)
}
function updateArticle (params, success) {
  blogDao.updateArticle(params, success)
}
function addArticle (params, success) {
  blogDao.addArticle(params, success)
}
function delateArticle (params, success) {
  blogDao.delateArticle(params,success)
}
module.exports = {
  queryArticleDetails,
  queryAllArticles,
  updateArticle,
  addArticle,
  delateArticle
  // login
}