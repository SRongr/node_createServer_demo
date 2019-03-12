const pathMap = new Map()
const service = require('../service/stuService')
const url = require('url')
const moment = require('moment')

function queryRowByLimit (reuqest, response) {
  const params = url.parse(reuqest.url, true).query
  try {
    service.queryCount((data) => {
      const total = data
      service.queryRowByLimit(parseInt(params.offset), parseInt(params.limit), (data) => {
        const head = {
          "Content-Type": 'application/json; charset=utf-8'
        }
        const rows = data
        const resObj = {
          rows,
          total
        }
        // console.log(resObj)
        response.writeHead(200, head)
        response.write(JSON.stringify(resObj))
        response.end()
      })
    })
    
  } catch (error) {
    console.log(error)
  }
}
function insertStudent(request, response) {
  const params = url.parse(request.url, true).query
  try {
    const insertParams = [params.name, params.sex, moment(params.birth).format("YYYY")]
    service.insertStudent(insertParams, (data) => {
      response.writeHead(200)
      response.write('OK')
      response.end()
    })
  } catch (error) {
    console.log(error)
  }
  
}
pathMap.set('/getStudentPage', queryRowByLimit)
pathMap.set('/insertStudent', insertStudent)

module.exports.path = pathMap