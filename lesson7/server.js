const http = require("http");
const url = require("url")
const conf = require("./config")
const fs = require("fs")
const webLoader = require('./loader')
const log = require("./log")
const filterSet = require("./filterLoder")
http.createServer((request, response) => {
  const pathName = url.parse(request.url, true).pathname
  for (let i = 0; i < filterSet.length; i ++) {
    const flag = filterSet[i](request, response)
    console.log(flag, pathName)
    if (!flag) {
      console.log('server. 拦截' + request.url)
      return
    }
  }
  if(isStatic(pathName)){
    // 请求的静态文件
    log('读取静态文件' + pathName)
    try {
      // console.log(conf.path + pathName)
      const data = fs.readFileSync(__dirname + '/' + conf['path'] + pathName)
      response.writeHead(200)
      response.write(data)
      // console.log('end')
      response.end()
    } catch (error) {
      console.log(error)
      response.writeHead(404)
      response.write("<html>404 NotFound</html>")
      response.end()
    }
  } else {
    // 请求的动态资源
    console.log('动态资源', pathName)
    if (webLoader.has(pathName)) {
      try {
        webLoader.get(pathName)(request, response)
        // console.log('have')
      } catch (error) { // 容错处理 服务器错误报500
        console.log(error)
        response.writeHead(500)
        response.write("<html>500</html>")
        response.end()
      }
    } else {
      response.writeHead(404)
      response.write("<html>404 NotFound</html>")
      response.end()
    }
    
  }
}).listen(conf.port)

log('服务已启动')
function isStatic (pathName) {
  for (let i = 0; i < conf.static_file_type.length; i ++) {
    const temp = conf.static_file_type[i];
    if (pathName.indexOf(conf.static_file_type[i]) === pathName.length - temp.length) {   // 防止index.htmlasdasd 这样的情况
      return true
    }
  }
  return false
} 