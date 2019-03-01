const net = require("net")
const fs = require("fs")
const conf = require('./conf')

const server = net.createServer()

server.listen(conf.port, "127.0.0.1")

console.log(conf)
server.on("listening", () => {
  console.log('服务已启动')
})
server.on('connection', (socket) => {
  socket.on("data", (data) => {
    const dataStr = data.toString() 
    const url = dataStr.split('\r\n')[0].split(' ')[1]
    console.log(__dirname + conf.path + url)
    try {
      const dataFile = fs.readFileSync(__dirname + conf.path +  url)  // 绝对路径
      console.log(__dirname + conf.path + url)
      console.log('找到文件' + url)
      socket.write("HTTP 200OK \r\n\r\n")
      socket.write(dataFile)
    } catch (e) {
      socket.write('HTTP 404Notfound\r\nContent-type:text/html;charset=utf-8 \r\n\r\n <html>找不到文件 <br> 哎呀404了呢</html>')
      console.log('找不到文件' + url)
    }
    socket.end()
    // console.log(url)
  })
})
