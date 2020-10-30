/**
 *
 * @author  晴云
 * @create 2020-09-16 9:56
 * @note 干什么的呢？
 * trailing:最后一次是否需要触发
 * leading：是否立即执行
 **/

function throttle(func,wait,options={}){
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
}


function throttle(func,wait){
  let timer=null;
  let pre=0;
  let remain=0;
  return function anonymous(...params){
        let now=new Date();
        remain=wait-(now-pre);
        if(remain<=0){
          clearTimeout(timer)
          timer=null;
          pre=Date.now();;
          func.apply(this,params)
        }else if(!timer){
          clearTimeout(timer)
          timer=null;
          timer=setTimeout(func,remain)
        }
  }
}
