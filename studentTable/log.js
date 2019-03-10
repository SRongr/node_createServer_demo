const fs = require("fs")
const conf = require('./config')
const moment = require('moment')


function log (data, targetFile = conf.log_name) {
  fs.appendFile(__dirname + '/' + conf.log_file + '/' + targetFile, data + moment(new Date()).format("YYYY-MM-DD HH:mm:ss") + '\n\r', () => {})
}

module.exports = {
  log
}