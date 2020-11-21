/**
 *
 * @author  晴云
 * @create 2020-11-03 10:18
 * @note 干什么的呢？
 **/

/*const cache = {}
let stack=new Set();
const cbs=new Map();
function cacheRequest(url, successCallback, failCallback) {
  if(cache[url]) {
    return successCallback(cache[url])
  }
  if(stack.has(url)){
    cbs.set(url,(cbs.get(url)||[]).concat(successCallback))
  }
  stack.add(url);
  const callBack = function(res) {
    cache[url] = res
    for(let cb of cbs.values()){
      cb(res);
    }
    cbs.set(url,[])
  }
  request(url, callBack, failCallback)
}
function a(){}
function b(){}
cacheRequest('/a',a)
cacheRequest('/a',b)*/

function one(fn) {
  return 1+(fn?fn():0)
}
function two(fn) {
  return 2+(fn?fn():0)
}
function add(...arg){
  return function (){
    return arg.reduce((vv,v)=>vv+v)
  }

}

console.log('这里是  的结果-------------', one(add(two(add(one())))))
console.log('这里是  的结果-------------', two(add(one(add(two(),one())))))
//  3
one(add(two()
))
two(add(one()))
//  3
