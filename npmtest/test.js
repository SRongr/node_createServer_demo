const test = require('npmtest')
test.hello()
test.hello().then(res => console.log(res))