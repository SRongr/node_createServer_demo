const fs = require("fs")
const conf = require('./config')
const moment = require('moment')


function log (data, targetFile = conf.log_file) {
  fs.appendFile(__dirname + '/' + conf.log_path + '/' + targetFile, data + moment(new Date()).format("YYYY-MM-DD HH:mm:ss") + '\n', () => {})
}

module.exports = {
  log
}