const pathMap = new Map()
const fs = require("fs")
const conf = require("./config")

const loaderFiles = fs.readdirSync(__dirname + '/' + conf['web_path'])
for (let i = 0; i < loaderFiles.length; i ++) {
  const temp = require(__dirname + '/' + conf['web_path'] + '/' +loaderFiles[i])
  // pathMap.set()
  console.log(temp.path)
  for (let [v, k] of temp.path) {
    pathMap.set(v, k)
  }
}

module.exports = pathMap