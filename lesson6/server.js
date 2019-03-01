const net = require("net")
const fs = require("fs")
// console.log(fs)
// const fsData = fs.readFileSync(__dirname + 'index.html')
const data = fs.readFileSync('index.html')
console.log(data.toString())
const server = net.createServer()

server.listen('12306', "127.0.0.1")

server.on("listening", () => {
  console.log('服务已启动')
})
server.on('connection', (socket) => {
  socket.on("data", (data) => {
    const dataStr = data.toString() 
    const url = dataStr.split('\r\n')[0].split(' ')[1]
    // console.log(url)
  })
})
