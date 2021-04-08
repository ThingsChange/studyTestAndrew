/**
 *
 * @author  晴云
 * @create 2021-03-29 8:52
 * @note 干什么的呢？
 **/

let a=[1,2,3,4,5]
a.forEach((v,i,a)=>{
  if(i<2) a.push(1);
  console.log('这里是 a[i] 的结果-------------', a[i]) // 1 2 3 4 5
},null)
let b=[1,2,3,4,5]
b.forEach((v,i,a)=>{
  if(i<2) a.pop();
  console.log('这里是 a[i] 的结果-------------', a[i]) // 1 2 3
})
let c=[1,2,3,4,5]
c.forEach((v,i,a)=>{
  if(i<2) a[i+3]=0;
  console.log('这里是 a[i] 的结果-------------', a[i]) // 1 2 3 0 0
})




Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve().then(() => console.log(3)).then(() => console.log(4))
}).then(() => {
  console.log(1);
})
