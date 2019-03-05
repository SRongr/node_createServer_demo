const studentService = require("../service/studentService")

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
function getData2 (req, res) {

}
path.set('/getData', getData)
path.set('/getData2', getData2)
module.exports.path = path