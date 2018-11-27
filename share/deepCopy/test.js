/**
 *  created by qingyun
 *  time: 2018/11/25  7:11
 *  note : 描述作用
 */
// import {deepCopy, isObject} from './deepCopy'
let a = require('./deepCopy')
console.log(a)
let test = {
  num: 0,
  str: '',
  boolean: true,
  nul: null,
  und: undefined,
  obj: {x: 1},
  arr: [0, 1, 2],
  func: function () {
    console.log('我是函数啊')
  },
  date: new Date('2018-11-25'),
  reg: new RegExp('/我就是传说中的正则啊/ig'),
  err: new Error('错误类型'),
  symbol: Symbol.for(1)
}
// let result = a.deepCopy(test)
// let result = a.deepCopyReflect(test)
// let result = a.deepCopyParse(test) // 存在失真啊
// let result = a.cloneDeep(test)
let result = a.deepClone(test)

console.log(result)
for (let key in result) {
  if (a.isObject(result[key])) { console.log(`${key}相同吗？ `, result[key] === test[key]) }
}
