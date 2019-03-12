const express = require("express")

const cookie = require('cookie-parser')
const conf = require('./config')
const loader = require('./loader')
const multer = require('multer')
const app = new express()

const uploadSingle = multer({'dest': './file/'})    // 指定文件上传到哪

app.use(express.static(conf['page_path']))
app.use(cookie())
app.get('/api/*', (request, response, next) => {
  console.log(request.url)
  if (request.cookies.id) {
    console.log(request.cookies)
    next()
  } else {
    response.redirect('/login.html')
  }
})


// console.log(loader.get('/api/loginStudent')())
app.get('/api/getAllStudent', loader.get('/api/getAllStudent'))
app.get('/api/insertStudent', loader.get('/api/insertStudent'))
// app.get('/login', loader.get('/login'))

app.post('/login', loader.get('/login'))
app.post('/upload', uploadSingle.single('file'), loader.get('/upload'))  // uploadSingle.single('file') 指定请求的时候 request下面的哪一个字段是文件
// app.post('/upload', uploadSingle.array('photos', 12), loader.get('/upload'))
app.get('/getPic', loader.get('/getPic'))
app.listen(conf.port)
