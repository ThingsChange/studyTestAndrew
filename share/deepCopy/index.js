/**
 *  created by qingyun
 *  time: 2018/11/21  21:56
 *  note : 引用数据类型的深复制一直是热点，今天写个练手
 */
// import _ from 'lodash'
// let _ = require('lodash')
const oldObj = {x: 1, y: 2, z: {t: 3}}
const newObj = Object.assign({}, oldObj)
console.log(newObj)
oldObj.x = 0 // 你以为这两部操作会出错吗？因为oldObj是常量？其实不然，并不会报错，并且修改成功，
oldObj.z.t = 4// 这其实也可以佐证，常量其实不可以变更的是值，而对象的值指的其实是他的引用地址
console.log(oldObj, newObj)
// 由此可以得出，object 其实还是浅copy,那么深拷贝怎么做呢，我们常见的方法，
const newObj2 = JSON.parse(JSON.stringify(oldObj))
console.log(newObj2)
// 看起来像是完美复制了，其实，这里面是有隐藏bug的，是因为你使用的函数所致，JSON.stringify()，就是他
let a = {x: 1, b: function(x) { console.log(x) }}
let b = JSON.parse(JSON.stringify(a))
console.log(a, b) // 结果是什么，可以自己试验下？why?
// JSON.stringify 这个函数在转换JSON对象变成JSON字符串的时候，存在属性丢失情况，具体请参考
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
b = _.assign({}, a)
a.b = function(x) { console.log(x + 1) }
console.log(a.b(1), b.b(2))
// lodash 实现的很好，那么是怎么实现的呢？
