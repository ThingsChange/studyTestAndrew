/**
 *  created by qingyun
 *  time: 2018/12/9  2:25
 *  note : 描述作用
 */

/*
* async function 声明将定义一个返回 AsyncFunction 对象的异步函数。
当调用一个 async 函数时，会返回一个 Promise 对象。当这个 async 函数返回一个值时，
Promise 的 resolve 方法会负责传递这个值；当 async 函数抛出异常时，Promise 的 reject 方法也会传递这个异常值。
*
*
* */

/*
* 语法：[return_value] = await expression;
表达式（express）：一个 Promise 对象或者任何要等待的值。
返回值（return_value）：返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身。
所以，当await操作符后面的表达式是一个Promise的时候，它的返回值，实际上就是Promise的回调函数resolve的参数。
*
* */
/*明白了这两个事情后，我还要再啰嗦两句。我们都知道Promise是一个立即执行函数，
但是他的成功（或失败：reject）的回调函数resolve却是一个异步执行的回调。
当执行到resolve()时，这个任务会被放入到回调队列中，等待调用栈有空闲时事件循环再来取走它。*/


async function async1() {
  console.log( 'async1 start' )
  await async2();
  console.log( 'async1 end' )
}

async function async2() {
  console.log( 'async2' )
}

console.log( 'script start' )

setTimeout( function () {
  console.log( 'setTimeout' )
}, 0 )

async1();

new Promise( function ( resolve ) {
  console.log( 'promise1' )
  resolve();
} ).then( function () {
  console.log( 'promise2' )
} ).then(()=>{console.log( 'promise3' )})
  .then(()=>{console.log( 'promise4' )})
  .then(()=>{console.log('promise5')})

console.log( 'script end' );
// script start
// VM552:2 async1 start
// VM552:8 async2
// VM552:20 promise1
// VM552:28 script end
// js Stack 空了，去任务队列取任务，查找到了，执行async1中创建的那个Promise ,Promise 遇见了Resolve函数，
// 状态改变，把resolve函数放到任务队里继续等待，紧接着输出
// 接下来取到的下一个任务，就是下面 new Promise 放进去的 resolve回调 啦
// 这个resolve被放到调用栈执行，并输出“promise2”，然后继续取下一个任务。
// VM552:23 promise2
// 调用栈再次空出来了，事件循环就取到了下一个任务：终于轮到的那个Promise的resolve回调
// 执行它（啥也不会打印的，因为 async2 并没有return东西，所以这个resolve的参数是undefined），
// 此时 await 定义的这个 Promise 已经执行完并且返回了结果，相当于await undefined,然后让出执行权
// VM552:24 promise3
// VM552:4 async1 end
// VM552:25 promise4
// VM552:26 promise5
// undefined
// VM552:14 setTimeout
