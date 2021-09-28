/**
 *
 * @author  晴云
 * @create 2021-09-12 12:37
 * @note 干什么的呢？
 **/

function throttle(fn, delay) {
  let flag = true,
    timer = null
  return function (...args) {
    let context = this
    if (!flag) return

    flag = false
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
      flag = true
    }, delay)
  }
}
function throttle(func,wait=300){
  let timer = null,
    pervious = 0;// 上一次触发的时间
  let context ,args, result;
  return function anonymous(){
    args = arguments;
    let now = new Date(),
      remaining = wait - (now - pervious); // 记录还剩多久触发
    if(remaining <= 0){
      // 两次操作的时间间隔已经超过wait了
      if(timer) {
        clearTimeout(timer);
        timer = null;
      }
      pervious = now;
      result =  func.apply(context,args)
      if (!timer) context = args = null;
    }else if (!timer){
      // 两次操作的时间间隔还不符合触发的频率
      timer = setTimeout(()=>{
        clearTimeout(timer);
        timer = null;
        pervious = new Date();
        result =   func.call(context,...args)
        if (!timer) context = args = null;
      },remaining)
    }
    return result;
  }
}

/*function throttle(func,wait,options={}){
  let timeout=null;
  let previous=0;
  let context ,args,result;
  var later = function() {
    // 如果 options.leading === false
    // 则每次触发回调后将 previous 置为 0
    // 否则置为当前时间戳
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout)context = args = null;
  };
  return function(){
    let now =new Date();
    if (!previous && options.leading === false)  previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;  // 解除引用，防止内存泄露
      }
      // 重置前一次触发的时间戳
      previous = now;
      result = func.apply(context, args);
      // 引用置为空，防止内存泄露
      // 感觉这里的 timeout 肯定是 null 啊？这个 if 判断没必要吧？
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) { // 最后一次需要触发的情况
      // 如果已经存在一个定时器，则不会进入该 if 分支
      // 如果 {trailing: false}，即最后一次不需要触发了，也不会进入这个分支
      // 间隔 remaining milliseconds 后触发 later 方法
      timeout = setTimeout(later, remaining);
    }
    return result;
  }
}*/
// Only add setZeroTimeout to the window object, and hide everything
// else in a closure.
(function() {
  var timeouts = [];
  var messageName = "zero-timeout-message";

  // Like setTimeout, but only takes a function argument.  There's
  // no time argument (always zero) and no arguments (you have to
  // use a closure).
  function setZeroTimeout(fn) {
    timeouts.push(fn);
    window.postMessage(messageName, "*");
  }

  function handleMessage(event) {
    if (event.source == window && event.data == messageName) {
      event.stopPropagation();
      if (timeouts.length > 0) {
        var fn = timeouts.shift();
        fn();
      }
    }
  }

  window.addEventListener("message", handleMessage, true);

  // Add the one thing we want added to the window object.
  window.setZeroTimeout = setZeroTimeout;
})();
