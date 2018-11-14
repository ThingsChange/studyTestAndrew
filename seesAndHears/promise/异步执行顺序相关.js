/**
 *
 * @author  56477
 * @create 2018-10-24 16:33
 * @note 干什么的呢？
 **/

async function a() {
  // 同步函数
  console.log('step into a');
  // await 执行b 并交出函数执行权
  //很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上await是一个让出线程的标志。
  // await后面的函数（或者表达式）（此处指b）会先执行一遍，然后就会跳出整个async函数来执行后面js栈（后面会详述）的代码。
  // 等本轮事件循环执行完了之后又会跳回到async函数中等待await后面表达式的返回值，如果返回值为非promise，
  // 则继续执行async函数后面的代码，否则将返回的promise放入promise队列（Promise的Job Queue）
  await b();
  console.log('leave a')
}
async function b() {
  console.log('step into b');
  // await 执行c 并交出函数执行权
  await c();
  console.log('x');
  var name = await 1;
  console.log('leave b');
}
async  function d(){
  return new Promise(function(res) {
    res('LeeeeeM');
  });
}
async function c() {
  console.log('step into c');
  // await 创建一个新的Promise 并且标记状态为fullfilled 并交出函数执行权,执行函数（ 函数 a）后面的东西
  //推入 Promise的Job Queue
  var name = await d();
/*
  var name = await new Promise(function(res) {
    res('LeeeeeM');
  });
*/
  console.log('name', name);
  name = await 'leeeeem';
  console.log('name', name);
  console.log('leave c');
}
//开始1
a();
//Promise 构造函数是直接执行，所有的异步操作被封装在其内部
new Promise(function(resolve) {
  //直接输出
  console.log('promise a');
  // 改变状态fullfilled，并且生成了一个 microtask
  // 调用resolve或reject并不会终结 Promise 的参数函数的执行。
  resolve(1);
  //此句还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
  console.log('leave a promise');
}).then(function(res) {
  //microtask在当前轮训或者叫执行栈结束时，读取任务队列之前执行，所以此时先输出1
  console.log(res);
  //then 方法如果then中的回调函数 返回的是一个未定状态（pending）的Promise，那么then返回的Promise也是未定状态的，
  // 并且它的终态与那个Promise的终态相同；同时，它变为终态时调用的回调函数参数与那个Promise变为终态时的回调函数的参数是相同的。
  // 如果then中的回调函数返回一个已经是接受状态的Promise，那么then返回的Promise也会成为接受状态，
  // 并且将那个Promise的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。(一种类似stack return的概念)
  //then 而此时返回的是2，那么相当于执行了，Promise.resolve(2)
  return 2;
}).then(function(res) {
  console.log(res);
  // return Promise.resolve(3);
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
setTimeout(()=>{
  console.log(10);
},0)
//当前执行栈中，同步任务的最后一个。至此，同步任务结束，将要进入microtask
console.log(9)

