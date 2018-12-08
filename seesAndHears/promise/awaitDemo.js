/**
 *  created by qingyun
 *  time: 2018/12/8  23:59
 *  note : 描述作用
 */

function testSometing() {
  console.log("执行testSometing");
  return "testSometing";
}
function testSometing2() {
  console.log("执行testSometing2");
  return "testSometing2";
}
async function testAsync() {
  console.log("执行testAsync");
  return Promise.resolve("hello async");
}

async function test() {
  console.log("test start...");
  const v1 = await testSometing();//关键点1
  console.log(v1);
//     const v2 = await testSometing2();
// 用同步方法testSomething2 可以得到的结论是，await交出执行权之后，
// 等到本轮的JS stack 为空的时候，在JS stack为空的时候，他会检查microTask
//  就回把执行权交还回来
  const v2 = await testAsync();
  console.log(v2);
  console.log(v1, v2);
}

test();

var promise = new Promise((resolve)=> { console.log("promise start.."); resolve("promise");});//关键点2
promise.then((val)=> console.log(val)).then(function(res) {
  console.log(res);
  return 2;
}).then(function(res) {
  console.log(res);
  return 3;
}).then(function(res) {
  console.log(res);
  return 4;
}).then(function(res) {
  console.log(res);
  return 5
}).then(function(res) {
  console.log(res);
  return 6;
}).then(function(res) {
  console.log(res);
  return 7;
}).then(function(res) {
  console.log(8);
});

console.log("test end...")
