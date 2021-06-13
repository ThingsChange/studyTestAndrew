/**
 *
 * @author  晴云
 * @create 2021-04-07 17:14
 * @note 干什么的呢？
 **/

function timer(time){
  return new Promise(resolve => {
    setTimeout(()=>{
      console.time('abc')
      resolve(time)
    },time)
  })
}
async  function  test(){
  const proList=[timer(2000),timer(5000),timer(1000)]
  for await (let  pro of proList){
    console.log('这里是 pro 的结果-------------', pro)
    console.timeEnd('abc')
  }
}
test();


Promise.resolve().then(() => {
  console.log(0);
   let a= Promise.resolve(4);
  console.log('这里是 a 的结果-------------', a)
   return a
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

/*
Promise.resolve().then(() => {
  console.log(7);
}).then(() => {
  console.log(8);
}).then(() => {
  console.log(9);
}).then(() => {
  console.log(10);
}).then(() =>{
  console.log(11);
})

Promise.resolve().then(() => {
  console.log(12);
}).then(() => {
  console.log(13);
}).then(() => {
  console.log(14);
}).then(() => {
  console.log(15);
}).then(() =>{
  console.log(16);
})*/
// 0  4   1 2 3 5 6
