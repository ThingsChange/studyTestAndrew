/**
 *
 * @author  晴云
 * @create 2020-09-16 9:56
 * @note 干什么的呢？
 **/
function _debounce(func, wait, immediately = false) {
  let timer = null;
  return function anonymous(...params) {
    let context = this;
    // let now=immediately&&!timer;
    clearTimeout(timer)
    if (immediately) {
      let callNow = !timer;
      timer = setTimeout(function () {
        timer = null;
      }, wait)
      if (callNow) func.apply(context, params)
    } else {
      timer = setTimeout(function () {
        func.apply(context, params)
      }, wait);
    }
  }
}

let _debounce = (func, wait = 300, immediately = false) => {
  let timer = null
  return function (...args) {
    // 如果实参传入立即执行并且计时器未开始，则立即执行
    let now = immediately && !timer
    // 每次点击都清除计时器
    clearTimeout(timer)
    timer = setTimeout(() => {
      // 计时器每次触发时都要清除计时器
      timer = null
      // 如果不是立即执行，则在计时器触发是执行
      !immediately && func.call(this, ...args)
    }, wait)
    now && func.call(this, ...args)
  }
}



var b = 1;
var a = _debounce(function a() {
  console.log(this.b)
}, 3000, true)
var c = {a, b: 2}
a();

function debounce(func, wait, immediately = false) {
  let timer = null;
  const context = this;
  return function anonymous(...params) {
    clearTimeout(timer)
    if (immediately) {
      let callNow = !timer;
      timer = setTimeout(() => timer = null, wait)
      if (callNow) func.apply(context, params)
    } else {
      timer = setTimeout(function () {
        func.apply(context, params)
      }, wait)
    }
  }
}

function debounce(func, wait) {
  let timer = null;
  return function anonymous(...params) {
    let context = this;
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        func.apply(context, params);
      }, wait)
    }
  }
}

function debounce(func, wait) {
  let timer = null;
  return function (...args){
    let context = this;
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>func.apply(context,args),wait)
  }
}
