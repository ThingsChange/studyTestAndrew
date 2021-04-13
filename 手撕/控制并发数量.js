/**
 *
 * @author  晴云
 * @create 2021-04-08 17:44
 * @note 干什么的呢？
 **/

let setTimeoutFn= (time)=>new Promise(resolve => setTimeout(()=>{
  console.log('这里是 v 的结果-------------', time)
  resolve(time)
},time))

let asyncPool= async function (limit,arr,fn){
  let res=[],curr=[]
  for (let item of arr){
    let p =Promise.resolve().then(()=>fn(item,arr));
    res.push(p)
    if(limit<=arr.length){
      const e =p.then(()=>curr.splice(curr.findIndex(v=>e===v),1));
      curr.push(e)
    }
    if(curr.length>=limit){
      await Promise.race(curr)
    }
  }
return Promise.all(arr);
}
asyncPool(2,[1000,1000,1000,3000,3000,5000],setTimeoutFn).then(res=>res)



var a = 0,
  b = 0;
function A(a) {
  A = function (b) {
    console.log(a + b++)
  }
  console.log(a++)
}
A(1)//1
A(2)//2 + 2


var toHex = function(num) {
  if(!num) return '0'
  let temp = '0123456789abcdef', ans = ''

  while(ans.length < 8 && num){
    ans = temp[num &15] + ans
    num >>= 4
  }
  return ans
};


console.log('这里是  的结果-------------', toHex(14))
/*
var b = 10;
(function b(){
  console.log(b)
  b = 5
  console.log(window.b)
  var b = 20
  console.log(b)
})()
*/

a=50
b=Number(50)
console.assert(a===b,1)
c=new Number(50)
