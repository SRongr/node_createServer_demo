const pathMap = new Map()
const stuService = require('../service/stuService')
const url = require('url')

function queryAllStudent(request, response) {
  console.log(request.url)
  try {
    stuService.queryAllStudent((data) => {
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
      })
      response.write(JSON.stringify(data))
      response.end()
    })
  } catch (error) {
    console.log(error)
  }
}
function insertStudent(request, response) {
  console.log(request.url)
  const params = url.parse(request.url, true).query
  const paramsArr = [params.studentNum, params.name, params.class, params.age, params.math, params.pwd]
  try {
    stuService.insertStudent(paramsArr, (data) => {
      response.writeHead(200, {
        "Content-Type": 'text/html; charset=utf-8'
      })
      response.write('写入成功')
      response.end()
    })
  } catch (error) {
    console.log(error)
  }
}
function loginStudent (request, response) {
  request.on("data", (data)=> {
    const params = url.parse(data.toString(), true).query
    const paramsArr = [params.studentNum]
    stuService.login(paramsArr, (result) => {
      if (!result[0]) {
        response.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8"
        })
        response.write('没有此用户名')
        response.end()
      } else {
        if (result[0].pwd === params.pwd) {
           // 写 cookie
          response.cookie('id', result[0].pwd)
          response.redirect('/api/getAllStudent')
          response.end()
        } else {
          response.redirect('/error.html')
          response.end()
        }
      }
    })
  })
}
pathMap.set('/api/getAllStudent', queryAllStudent)
pathMap.set('/api/insertStudent', insertStudent)
pathMap.set('/login', loginStudent)
module.exports.path = pathMap