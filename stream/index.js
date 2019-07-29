const fs = require('fs')
const http  = require('http')
const path = require('path')


// const server = http.createServer((req, res) => {
//   const fileName = path.resolve(__dirname, 'a.txt')
//   const stream = fs.createReadStream(fileName)
//   stream.pipe(res)
// })

const server = http.createServer((req, res) => {
  const fileName = path.resolve(__dirname, 'a.txt')
  fs.readFile(fileName, (data) => {
    res.end(data)
  })
})


server.listen(12306, () => {
  console.log('12306')
} )


// 使用ab 做压力测试
// 开启Apache  sudo apachectl start
// ab -n 100(100 次请求) -c 100(1次请求请求100次)