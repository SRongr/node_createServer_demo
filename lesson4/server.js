const net = require('net');
const server = net.createServer()
 
server.listen(12306, '127.0.0.1')
console.log(server.address())
server.on('listening', () => {
  // server已经监听上了 出发 listening
  console.log(server.address())
  console.log('服务已启动')
})

server.on('connection', (socket) => {
  // 有新建连接的时候触发 connection
  // 可以接收一个socket 参数， socket 可以调用socket 的方法 和 事件
  console.log('有新的连接')
  socket.on('data', (data) => {
    // 监听socket 写入的数据
    console.log(data.toString())
    socket.write('hello client')
    socket.on('close', () => {
      console.log('收到客户端已关闭')
      server.close()
    })
  })
})

server.on('close', () => {
  // 监听server 关闭
  console.log('server 已关闭')
})

