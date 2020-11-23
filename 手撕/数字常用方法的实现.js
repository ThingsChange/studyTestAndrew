/**
 *
 * @author  晴云
 * @create 2020-11-21 15:28
 * @note 干什么的呢？
 **/
//MDN
Array.prototype.MyReduce=function (callBack,/*,initialValue*/){
  if(this===null) throw new TypeError('Array.prototype.reduce called on null or undefined')
  if(typeof  callBack !=='function') throw new TypeError('callBack is not a function')
  var o=Object(this);
  var len =o.length>>>0;
  var k=0;
  var value;
  if(arguments.length>=2){
    value=arguments[1]
  }else{
    while(k<len && !(k in o)){
      k++
    }
    if(k>=len){
      throw new Error('Reduce of Empty array with no initial value')
    }
    value=o[k++]
  }
  while(k<len){
    if(k in o){
      value =callBack(value,o[k],k,o)
    }
    k++;
  }
  return value
}

Array.prototype.myReduce=function (func,initialValue){
  var arr=this;
  var base = typeof initialValue==='undefined' ? arr[0]:initialValue
  var startPoint=typeof initialValue==='undefined'?1:0;
  for(var i=startPoint,len=arr.length;i<len;i++){
    base=func(base,arr[i],i,arr);
  }
  return base;
}
