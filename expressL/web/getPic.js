const path = new Map()
const url = require('url')
const fs = require('fs')
function getPic (request, response) {
  try {
    const params = url.parse(request.url, true).query
    const file = fs.readFileSync('./' + params.path)
    response.writeHead(200)
    response.write(file)
  } catch (error) {
    throw new error(error)
  }
  
}

path.set('/getPic', getPic)

module.exports.path = path