// https://www.jb51.net/article/124321.htm
// https://segmentfault.com/a/1190000007535316
/* 解释可以参考*/
async function testSometing() {
  console.log('执行testSometing')
  // 妈的两种写法还有区别，卧槽
  // return 'testSometing'
  return Promise.resolve('testSometing')
}

async function testAsync() {
  console.log('执行testAsync')
  return Promise.resolve('hello async')
}
async function testV3() {
  console.log('执行testV3')
  return Promise.resolve('hello testV3')
}

async function test() {
  console.log('test start...')
  const v1 = await testSometing()
  console.log(v1)
  const v2 = await testAsync()
  console.log(v2)
  console.log(v1, v2)
  const v3 = await testV3()
  console.log(v3)
}

test()

var promise = new Promise((resolve) => {
  console.log('promise start..')
  resolve('promise')
})// 3
promise.then((val) => {
  console.log(val)
  return val
}).then(function(res) {
  console.log(res)
  return 3
}).then(function(res) {
  console.log(res)
  return 4
}).then(function(res) {
  console.log(res)
  return 5
}).then(function(res) {
  console.log(res)
  return 6
}).then(function(res) {
  console.log(res)
  return 7
}).then(function(res) {
  console.log(res)
  return 8
}).then(function(res) {
  console.log(res)
  return 9
}).then(function(res) {
  console.log(res)
  return 10
}).then(function(res) {
  console.log(res)
  return 11
}).then(function(res) {
  console.log(res)
  return 12
})

console.log('test end...')
