const net = require("net");
const server = net.createServer();

server.listen(12306, "127.0.0.1");
server.on("listening", () => {
  console.log("服务已启动")
})

server.on("connection", (socket) => {
  console.log('有新的连接')
  socket.on("data", (data) => {
    console.log(data.toString())
    // const url = data.toString().split('\r\n')[0].split(' ')[1]
    const requestArr = data.toString().split('\r\n')
    console.log(requestArr)
    const url = requestArr[0].split(' ')[1]
    console.log(url)
    socket.write("HTTP 200OK\r\nContent-type:text/html;charset=utf-8\r\nServer: wrs/1.1\r\n\r\n<html>hellow 已经习惯了回车和换行一次搞定，敲一个回车键，即是回</html>")
  })
})