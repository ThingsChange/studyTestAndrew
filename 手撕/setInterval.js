/**
 *
 * @author  晴云
 * @create 2021-05-25 11:20
 * @note 干什么的呢？
 **/

let timers = {};
let mySetInterval = function (fn, wait) {
  let key = Symbol();
  let exec = function (fn, wait) {
    timers[key] = setTimeout(function () {
      fn();
      exec(fn, wait)
    }, wait)
  }
  return key;
}
let myCearInterval = function (timer){
  if(timer in timers){
    clearTimeout(timers[timer])
    delete timers[timer]
  }
}
