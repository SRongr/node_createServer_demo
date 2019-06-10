const express = require("express")
const cookie = require('cookie-parser')
const conf = require('./config')
const loader = require('./loader')
const multer = require('multer')
const app = new express()
const cors = require('cors')

app.use(cors({
  origin:['http://localhost:4200','http://localhost:8080'],
  methods:['GET','POST'],
  alloweHeaders:['Conten-Type', 'Authorization']
}));

app.use(express.static(conf['page_path']))

app.get('/api/queryArticleDetails',loader.get('/api/queryArticleDetails'))
app.get('/api/queryAllArticles',loader.get('/api/queryAllArticles'))
app.post('/api/updateArticle', loader.get('/api/updateArticle'))
app.post('/api/delateArticle', loader.get('/api/delateArticle'))
app.listen(conf.port, () => {
  console.log(conf.port)
})
