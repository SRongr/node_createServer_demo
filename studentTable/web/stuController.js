const pathMap = new Map()
const sevrice = require('../service/stuService')
const url = require('url')
const moment = require('moment')

function queryCount (success) {
  sevrice.queryCount((data) => {
    success(data)
  })
}

function queryRowByLimit (reuqest, response) {
  const params = url.parse(reuqest.url, true).query
  try {
    queryCount((data) => {
      const total = data
      sevrice.queryRowByLimit(parseInt(params.offset), parseInt(params.limit), (data) => {
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
  // console.log(params)
  try {
    const insertParams = [params.name, params.sex, moment(params.birth).format("YYYY")]
    console.log(insertParams)
    sevrice.insertStudent(insertParams, (data) => {
      console.log(data)
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