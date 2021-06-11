/**
 *
 * @author  晴云
 * @create 2021-06-11 11:18
 * @note 干什么的呢？
 **/

let callFuction = function (target, ...args) {
  let thisObj = target;
  target = target === null?window:target;
  if (['number', 'string', 'boolean'].includes(typeof target)) {
    target = Object(target)
  }
  let key = Symbol();
  target[key] = this;
  let result = target[key](...args)
  delete target[key]
  return result
}


Function.prototype._apply = function (thisTarget,...args){
  thisTarget = thisTarget === null ?window:thisTarget;
  if (['number', 'string', 'boolean'].includes(typeof thisTarget)) {
    thisTarget = Object(thisTarget)
  }
  let result;
  let key = Symbol.for('temp')
  thisTarget[key] = this;
  result = thisTarget[key](...args);
  delete  thisTarget[key]
  return result
}


Function.prototype._bind=function (thisTarget,...args){
  let func= this;
  if(typeof  func!=="function") throw 'bind  first-param should be a function';
  let boundFun = function (){}
  //做下func 没有prototype的兼容
  boundFun.prototype = Object.create(func.prototype || Function.prototype)
  return function (...innerArg){
    return  func.apply(this instanceof  boundFun ?this:thisTarget,args.concat(innerArg))
  }
}
