console.log('hello world')
const a = 123
const b = 'abc'
const x = {}
const y = {}
const z = x
console.log(`x === y: ${x === y}`)
console.log('z === x: ', z === x)
console.log('exports:' ,exports, 'module.exports', module.exports)
console.log(`exports ===  module.exports: ${exports ===  module.exports}`)
// 开闭原则  对扩展开放 对 修改关闭，  不能引入之后改变test 里面的a
module.exports = a
// module.exports.b = b
 
// module.exports 可以简写为exports
exports = b