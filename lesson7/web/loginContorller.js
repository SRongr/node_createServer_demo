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
  const query = url.parse(req.url, true).query
  console.log(query)
  req.on("data", (data) => {
    dataStr = data.toString()[0] === '?' ? data.toString() : '?' + data.toString()
    const params = url.parse(dataStr, true).query
    const stuNum = params.stuNum
    const password = params.password
    console.log(stuNum)
    studentService.queryPWDByStudentNum(stuNum, (queryRes) => {
      if (queryRes.length === 0) {
        // 没有这个学号
        res.writeHead(404)
        res.write('NotFound')
        res.end()
      } else {
        const resPWD = queryRes[0].pwd
        if (resPWD == password) {
          /* 
            ajax 跳转页面使用代码
          */
          res.writeHead(200)
          res.write('OK')
          /* 
            From 表单跳转页面使用代码
            res.writeHead(302, {"location": '/main.html'})
          */
        } else {
          // res.writeHead(500)
          // res.write('Fail')
          
          /*   // From 表单跳转页面使用代码
            res.writeHead(302,  {"location": '/error.html'})
          */
        }
        res.end()
      }
    })
  })
    // const stuNum = params.stuNum || 4
    // const password = params.password || 3
    // // console.log(stuNum, password, '21312312')
    // // console.log('loginController.js', stuNum)
    // studentService.queryPWDByStudentNum(stuNum, (queryRes) => {
    //   if (queryRes.length === 0) {
    //     // 没有这个学号
    //     res.writeHead(404)
    //     res.write('NotFound')
    //     res.end()
    //   } else {
    //     const resPWD = queryRes[0].pwd
    //     if (resPWD == password) {
    //       res.writeHead(200)
    //       res.write('OK')
    //     } else {
    //       res.writeHead(500)
    //       res.write('Fail')
    //     }
    //     res.end()
    //   }
    // })
  // })
  // const stuNum = params.stuNum || 4
  // const password = params.password || 3
  // console.log('loginController.js', stuNum)
  // studentService.queryPWDByStudentNum(stuNum, (queryRes) => {
  //   if (queryRes.length === 0) {
  //     // 没有这个学号
  //     res.writeHead(404)
  //     res.write('NotFound')
  //     res.end()
  //   } else {
  //     const resPWD = queryRes[0].pwd
  //     console.log(queryRes)
  //     if (resPWD === password) {
  //       res.writeHead(200)
  //       res.write('OK')
  //     } else {
  //       res.writeHead(500)
  //       res.write('Fail')
  //     }
  //     res.end()
  //   }
  // })
}
path.set('/getData', getData)
path.set('/login', login)
module.exports.path = path