/**
 *
 * @author  晴云
 * @create 2021-05-25 11:20
 * @note 干什么的呢？
 **/

let timers = {};
let mySetInterval = function (fn, wait,...args) {
  let key = Symbol();
  let content = this;
  let exec = function (fn, wait) {
    timers[key] = setTimeout(function () {
      fn.apply(content,args);
      exec(fn, wait)
    }, wait)
  }
  timers[key] = exec(fn,1000);
  return key;
}
let myCearInterval = function (timer){
  if(timer in timers){
    clearTimeout(timers[timer])
    delete timers[timer]
  }
}

let a =function (){
  console.log('这里是 1 的结果-------------', 1)
}
mySetInterval(a,1000)
