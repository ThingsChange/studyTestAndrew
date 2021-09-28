/**
 *
 * @author  晴云
 * @create 2021-04-08 17:44
 * @note 干什么的呢？
 **/

let setTimeoutFn = (time) => new Promise(resolve => setTimeout(() => {
  console.log('这里是 v 的结果-------------', time)
  resolve(time)
}, time))

let asyncPool = async function (limit, arr, fn) {
  let res = [], curr = []
  for (let item of arr) {
    let p = Promise.resolve().then(() => fn(item, arr));
    res.push(p)
    if (limit <= arr.length) {
      const e = p.then(() => curr.splice(curr.findIndex(v => e === v), 1));
      curr.push(e)
    }
    if (curr.length >= limit) {
      await Promise.race(curr)
    }
  }
  return Promise.all(arr);
}

// asyncPool(2,[1000,1000,1000,3000,3000,5000],setTimeoutFn).then(res=>res)


/*function multiRequest(urls = [], maxNum) {
  // 请求总数量
  const len = urls.length;
  // 根据请求数量创建一个数组来保存请求的结果
  const result = new Array(len).fill(false);
  // 当前完成的数量
  let count = 0;

  return new Promise((resolve, reject) => {
    // 请求maxNum个
    while (count < maxNum) {
      next();
    }

    function next() {
      let current = count++;
      // 处理边界条件
      if (current >= len) {
        // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
        !result.includes(false) && resolve(result);
        return;
      }
      const url = urls[current];
      console.log(`开始 ${current}`, new Date().toLocaleString());
      setTimeoutFn(url)
        .then((res) => {
          // 保存请求结果
          result[current] = res;
          console.log(`完成 ${current}`, new Date().toLocaleString());
          // 请求没有全部完成, 就递归
          if (current < len) {
            next();
          }
        })
        .catch((err) => {
          console.log(`结束 ${current}`, new Date().toLocaleString());
          result[current] = err;
          // 请求没有全部完成, 就递归
          if (current < len) {
            next();
          }
        });
    }
  });
}*/
function multiRequest(urls,maxNum){
  // 请求的总数
  const len = urls.length;
  //我们要对外面响应的结果,确保每个请求的位置
  const result = Array.from({length:len},()=>false)
  let count = 0;
  return new Promise(resolve=>{
    while(count<maxNum){
      next();
    }
    function next(){
      let current = count++;
      if(current >= len){
        !result.includes(false)&&resolve(result);
        return ;
      }
      const url = urls[current];
      console.log(`开始${current}`,new Date().toLocaleString())
      //此处我们模拟请求
      setTimeoutFn(url).then(res=>{
        result[current] = res;
        console.log(`请求${current}完成`, new Date().toLocaleString());
      }).catch(err=>{
        console.log(`请求${current}失败`, new Date().toLocaleString());
        result[current] = err;
      }).finally(()=>{
        if(current < len) next()
      })
    }
  })
}

// console.log(multiRequest([1000, 1000, 1000, 3000, 3000, 5000], 2));
console.log(multiRequest([1000, 500, 300, 400], 2));


/*

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

*/

var toHex = function (num) {
  if (!num) return '0'
  let temp = '0123456789abcdef', ans = ''

  while (ans.length < 8 && num) {
    ans = temp[num & 15] + ans
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

a = 50
b = Number(50)
console.assert(a === b, 1)
c = new Number(50)
