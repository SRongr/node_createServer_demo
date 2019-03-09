const pathMap = new Map()
const url = require("url")
const req = require("request")

function postChat(request, response) {
  const params = url.parse(request.url, true).query
  const data = {
    "perception": {
      "inputText": {
          "text": params.text
      },
    },
    "userInfo": {
        "apiKey": "15ad9df7cd2d43ae9dd494c92db7eb3f",
        "userId": "me"
    }
  }
  req({
    url:"http://openapi.tuling123.com/openapi/api/v2",
    method: 'POST',
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data)
  }, (error, resp, body) => {
    if (!error && resp.statusCode === 200) {
      // 把结果返回前段页面
      const head = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "x-request-with, content-type",
        "Content-Type": "text/html; charset=utf-8"
      }
      response.writeHead(200, head)
      const obj = JSON.parse(body)
      if (obj && obj.results && obj.results[0] && obj.results[0].values) {   // 判断是否正常返回， 一点一点前进，防止报错
        const resText = obj.results[0].values
        response.write(JSON.stringify(resText))
        // response.write(resText)
        response.end()
      } else {
        // 当解析不出来的时候
        response.write("{\"text\": \"偶布吉岛你说的是啥\"}")
        response.end()
      }
    } else {
      // 返回给前段页面一个400 错误
      response.writeHead(400)
      response.write('Fail')
      response.end()
    }
  })
  
}

pathMap.set('/api/chat', postChat)

module.exports.path = pathMap

