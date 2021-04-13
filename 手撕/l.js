/**
 *
 * @author  晴云
 * @create 2021-04-08 10:17
 * @note 干什么的呢？
 **/

Promise.resolve().then(() => {
  console.log(0);
  // return Promise.resolve(4).then(()=> console.log('这里是 11 的结果-------------', 11)).then(()=> console.log('这里是 22 的结果-------------', 22));//.then(res=> console.log(10))
    let a = new Promise((resolve,reject)=>{
      // Promise.resolve(4).then(data=>resolve(data))
      resolve(4)
    })
    console.log('这里是 a 的结果-------------', a)
    return a
  // return Promise.resolve(4).
}).then((res) => {
  console.log(res)
})

x.then(resolve)
// 0  1
//resolve  2
//

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})
//虚无  因为then函数返回的是一个promise  而promise只有在fullfilled 的时候才会注册then函数
// then方法需要根据你的返回值决定什么时候 调用该函数的resolve； ( 结果：Promise).then(resolve=>resolve())
// 0  1 11 2 22 3        虚无    5   undefined   6
