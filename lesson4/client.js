const net = require('net')
const socket = net.connect(12306, '127.0.0.1')

socket.setTimeout(2000)
// 设置超时时间
socket.on('connect', () => {
  // 监听连接事件
  console.log('已连接到服务器')
  console.log(`remoteAddress: ${socket.remoteAddress}`)
  console.log(`remotePort: ${socket.remotePort}`)
  console.log(`localAddress: ${socket.localAddress}`)
  console.log(`localPort: ${socket.localPort}`)
})

socket.on('timeout', () => {
  // 监听超时
  console.log('连接超时')
  socket.end()
})

socket.write('hello world')
// 写入数据发送的server

socket.on('data', (data) => {
  console.log(data.toString())
  // socket.end() // 调用客户端关闭的方法
})

socket.on('close', () => {
  // 监听socket 的关闭 
  console.log('客户端已关闭')
})