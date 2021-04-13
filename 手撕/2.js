/**
 *
 * @author  晴云
 * @create 2021-04-08 10:17
 * @note 干什么的呢？
 **/

Promise.resolve(4).then(()=>{
  console.log('这里是 -1 的结果-------------', -1)
})
console.log('这里是 8 的结果-------------', 8)

Promise.resolve().then(() => {
  // Promise
  console.log(0);
  return Promise.resolve(4)
}).then((res) => {
  console.log(res)
})
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
