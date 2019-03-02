
const globalCofing = require('./config.json')
if (!globalCofing["static_file_type"]) {
  console.log(23)
  throw new Error("配置文件异常, 缺少:static_file_type")
}

module.exports = globalCofing

