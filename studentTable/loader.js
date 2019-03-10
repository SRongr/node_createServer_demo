const fs = require("fs")
const conf = require("./config")

// console.log(conf)
const web_files = conf['web_path']
const files = fs.readdirSync(__dirname + '/' + web_files)


const pathMap = new Map() // 汇总所有的pathMap 
const contorllorSet = []  // 将controller 全都放入这个数组里
for (let i = 0; i < files.length; i ++) { // 读 /web 下的所有文件
  const temp = require('./' + web_files + '/' + files[i])
  if (temp.path) {  // 通常只有controller 有path 这个属性
    contorllorSet.push(temp.path)
    for (let [key, value] of temp.path) {
      if (pathMap.has(key)) { // 判断pathMap  是否已有此 key
        throw new Error('url path异常,url:' + key) 
      } else {
        pathMap.set(key, value)
      }
    } 
  }
}

module.exports = pathMap