
const fs = require("fs")
const conf = require("./config")
const filter_files = conf['filter_path']
const filterSet = []
const files = fs.readdirSync(__dirname + '/' + filter_files)

for (let i = 0; i < files.length; i ++) {
  const temp = require('./' + filter_files + '/' + files[i])
  filterSet.push(...temp)
}

module.exports = filterSet