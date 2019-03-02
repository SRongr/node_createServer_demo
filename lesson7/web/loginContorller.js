const path = new Map()
function getData (req, res) {
  throw new Error('一个程序的错误')
  // res.writeHead(200)
  // res.write('hello')
  // res.end()
}
function getData2 (req, res) {

}
path.set('/getData', getData)
path.set('/getData2', getData2)
module.exports.path = path