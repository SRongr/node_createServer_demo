const studentService = require("../service/studentService")
const url = require('url')

const path = new Map()
function getData (req, res) {
  // throw new Error('一个程序的错误')
  // console.log(queryAllStudent)
    studentService.queryAllStudent((data) => {
      const resArr = []
      for (let i = 0; i < data.length; i ++) {
        resArr.push(data[i].name)
      }

      console.log(data)
      res.write(resArr.toString())
      console.log(resArr)
      res.end()
    })
    // res.writeHead(200)
    // res.write(data)
   
}
function login (req, res) {
  const params = url.parse(req.url, true).query
  console.log(params)
  const stuNum = params.stuNum
  const password = params.password
  console.log('loginController.js', stuNum)
  studentService.queryPWDByStudentNum(stuNum, (queryRes) => {
    if (queryRes.length === 0) {
      // 没有这个学号
      res.writeHead(404)
      res.write('NotFound')
      res.end()
    } else {
      const resPWD = queryRes[0].pwd
      console.log(queryRes)
      if (resPWD === password) {
        res.writeHead(200)
        res.write('OK')
      } else {
        res.writeHead(500)
        res.write('Fail')
      }
      res.end()
    }
  })
}
path.set('/getData', getData)
path.set('/login', login)
module.exports.path = path