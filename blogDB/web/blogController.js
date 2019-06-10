const pathMap = new Map()
const blogService = require('../service/blogService')
const url = require('url')

function queryArticleDetails(request, response) {
  const id = url.parse(request.url.toString(),true).query.id || 2
  console.log(request.url)
  try {
    blogService.queryArticleDetails(id,(data) => {
      response.writeHead(200, {
        "Content-Type":" Application/json; charset=utf-8"
      })
      response.write(JSON.stringify(data[0]))
      response.end()
    })
  } catch (error) {
    console.log(error)
  }
}
function queryAllArticles (request, response) {
  try {
    blogService.queryAllArticles( data => {
      const newArr = data.sort((a,b) => {return (b.utime - a.utime)})
      const obj = {
        total: data.length,
        articleArr: newArr,
      }
      response.writeHead(200, {
        "Content-Type":" Application/json; charset=utf-8"
      })
      response.write(JSON.stringify(obj))
      console.log(obj)
      response.end()
    })
  } catch (error) {
    console.log(error)
  }
}
function updateArticle(request, response) {
  try {
    request.on('data' , data => {
      const params = JSON.parse(data.toString())
      const time = Math.floor(new Date().valueOf() / 1000)
      if (params.id) {
        const paramsArr = [params.title,params.content,params.tags,time,params.id]
        blogService.updateArticle(paramsArr, data => {
          response.writeHead(200, {
            "Content-Type":" Application/json; charset=utf-8"
          })
          response.write(JSON.stringify('ok'))
          response.end()
        })
      } else {
        const paramsArr = [params.title, params.content, params.tags, time, time]
        blogService.addArticle(paramsArr, data => {
          response.writeHead(200, {
            "Content-Type":" Application/json; charset=utf-8"
          })
          response.write(JSON.stringify('ok'))
          response.end()
        })
      }
    })
  } catch (error) {
    
  }
}
function delateArticle(request, response) {
  try {
    request.on('data', data => {
      const id = data.toString()
      blogService.delateArticle(id, data => {
        queryAllArticles(request,response);
      })
    })
  } catch (error) {
    
  }
}
pathMap.set('/api/queryArticleDetails', queryArticleDetails)
pathMap.set('/api/queryAllArticles', queryAllArticles)
pathMap.set('/api/updateArticle', updateArticle)
pathMap.set('/api/delateArticle', delateArticle)
module.exports.path = pathMap