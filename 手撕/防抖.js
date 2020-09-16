/**
 *
 * @author  晴云
 * @create 2020-09-16 9:56
 * @note 干什么的呢？
 **/
function debounce(func,wait,immediately=false) {
  let timer=null;
  return function anonymous(...params) {
    // let now=immediately&&!timer;
    clearTimeout(timer)
    if(immediately){
      let callNow = !timer;
      timer = setTimeout(function(){
        timer = null;
      }, wait)
      if (callNow) func.apply(this, params)
    }else{
      timer = setTimeout(function(){
        func.apply(this, params)
      }, wait);
    }
  }
}
