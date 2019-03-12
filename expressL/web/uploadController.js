const path = new Map()
const fileService = require('../service/fileListService')


function upload(request, response) {
  const file = request.file
  const id = request.cookies.id
  const paramsArr = [file.originalname, file.size, file.path, id]
  fileService.insertFile(paramsArr, (result) => {
    response.writeHead(200)
    response.end(file.path) 
  })

}

path.set('/upload', upload)

module.exports.path = path
