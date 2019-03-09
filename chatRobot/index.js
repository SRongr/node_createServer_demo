const http = require("http")
const url = require('url')
const fs = require("fs")
const conf = require('./config')
const webLoader = require("./loader")
const log = require('./log').log

http.createServer((request, response) => {
  log('服务已启动')
  const pathName = url.parse(request.url, true).pathname
  log(pathName)
  if (isStaticFile(pathName)) {
    // 读取静态资源
    log('读取静态资源')
    try {
      const file = fs.readFileSync('./' + conf.page_path + pathName)
      response.writeHead(200)
      response.write(file)
      // console.log(file.toString())
      response.end()
    } catch (e) {
      response.writeHead(404)
      response.write('404 NotFound')
      response.end()
    }
  } else {
    log('读取动态资源')
    if (webLoader.has(pathName)) {
      webLoader.get(pathName)(request, response)
    } else {
      response.writeHead(404)
      response.write('404 NotFound')
      response.end()
    }
  }
 
}).listen(conf.port)

function isStaticFile (pathName) {

  for (let i = 0; i < conf.staticFile.length; i ++) {
    if (pathName.indexOf(conf.staticFile[i]) === pathName.length - conf.staticFile[i].length) {
      return true
    }
  }
  // console.log(pathName)
  return false
}