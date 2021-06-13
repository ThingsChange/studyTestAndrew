/**
 *
 * @author  晴云
 * @create 2021-06-10 15:49
 * @note 如何实现一个new？
 **/

function newF(func,...args){
  if(!func.prototype) throw new Error(func + 'is not a constructor')
  let res = Object.create(func.prototype);
  let ret = func.apply(res,args);
  return typeof ret==='object' && ret!==null ?ret:res
}
