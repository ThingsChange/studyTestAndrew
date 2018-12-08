/**
 *  created by qingyun
 *  time: 2018/12/8  23:27
 *  note : 描述作用
 */

async function testSometing() {
  console.log("执行testSometing");
/*  return new Promise(function(resolve){
    console.log('我到底在哪儿执行')
    resolve("testSometing");
  })*/
  return  Promise.resolve('testSometing')
}

async function testAsync() {
  console.log("执行testAsync");
  return Promise.resolve("hello async");
}
async function testAsync2() {
  console.log("执行testAsync2");
  return Promise.resolve("hello async2");
}
async function test() {
  console.log("test start...");
  const v1 = await testSometing();
  console.log(v1);
  const v2 = await testAsync();
  console.log(v2);
  const v3 = await testAsync2();
  console.log(v3);
  console.log(v1, v2,v3);
}

test();
//
// 1 同步代码执行test start...
// 2 执行await 后面的testSometing  返回一个已决仪的Promise  交出执行权
//3、执行  promise start.. ，promise 此时已决仪
//4、将promise .then 生成一个新的可被链的Promise ,并将其推入到Promise 的JOB Queue 中
//5 执行后续好多代码，都生成未决议的promise
//6 执行 test end... 当前task 执行结束，js stack已空，检查microtask队列
//7 输出 promise ,并将其a2 推入队列尾部                                                                promise
//8  v1   的await 后面的表达式返回值是一个Promise ,将其推入队列尾部
//9 执行a2  输出了  undefined   交出执行权  并将生成的Promise.resolve(2）推入尾部  给v1   undefined
//10 v1 赋值为testSometing  并输出，接着进入v2 await 后面的函数                                      testSometing
//11 执行testAsync 然后交出执行权                                                                                            执行testAsync
//12  执行 第9步推入的，然后生成一个Promise.resolve(3）推入尾部  给v2                              2
//13  v2   的await 后面的表达式返回值是一个Promise ,将其推入队列尾部
//14 执行12步的promise的回调函数，然后生成一个Promise.resolve(4）推入尾部  给v2          3
//15 v2 赋值为hello async  并输出，接着进入v3 await 后面的函数
var promise = new Promise((resolve)=> { console.log("promise start.."); resolve("promise");});
var a1=promise.then((val)=> console.log(val));
console.log(a1)
console.log('我是Promise a1 a   ----------' , a1)

var a2=a1.then(function(res) {
  console.log(res);
  // return 2;
  return Promise.resolve(2)
})
console.log(a1,a2)

var a3=a2.then(function(res) {
  console.log(res);
  return Promise.resolve(3)
//   return 3;
})
var a4=a3.then(function(res) {
  console.log(res);
  return Promise.resolve(4)
//   return 4;
})
var a5=a4.then(function(res) {
  console.log(res);
  return 5
})
var a6=a5.then(function(res) {
  console.log(res);
  return 6;
})
var a7=a6.then(function(res) {
  console.log(res);
  return 7;
})
var a8=a7.then(function(res) {
  console.log(res);
  return 8;
})
var a9=a8.then(function(res) {
  console.log(res);
  return 9
})
var a10=a9.then(function(res) {
  console.log(res);
  return 10;
})
var a11=a10.then(function(res) {
  console.log(res);
  return 11;
})
var a12=a11.then(function(res) {
  console.log(res);
  return 12;
})
var a13=a12.then(function(res) {
  console.log(res);
  return 13
})
var a14=a13.then(function(res) {
  console.log(res);
  return 14;
})
var a15=a14.then(function(res) {
  console.log(res);
  return 15;
})
var a16=a15.then(function(res) {
  console.log(res);
  return 16;
});
console.log("test end...")
