
const url = require("url")
const conf = require("../config")


function isStatic (pathName) {
  for (let i = 0; i < conf.static_file_type.length; i ++) {
    const temp = conf.static_file_type[i];
    if (temp === '.html') {
      continue
    }
    if (pathName.indexOf(conf.static_file_type[i]) === pathName.length - temp.length) {   // 防止index.htmlasdasd 这样的情况
      console.log('静态资源')
      return true
    }
  }
  return false
} 

function loginFilter (req, res) {
  const pathName = url.parse(req.url, true).pathname
  // console.log(pathName + '??')
  const cookie = req.headers.cookie
  if (cookie) {
    const cookiesArr = cookie.split('; ')
    for (let i = 0; i < cookiesArr.length; i ++) {
      if (cookiesArr[i].split("=")[0] === 'id') {
        return true
      }
    }
  }
  if (pathName === '/index.html' || pathName === '/login' ||  isStatic(pathName)) {
    console.log('放行')
    // res.end()
    return true
  }
  console.log("拦截")
  res.writeHead(302, {"location": "/index.html"})
  res.end()
  return false
}

module.exports = [loginFilter]
