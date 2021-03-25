/**
 *
 * @author  晴云
 * @create 2021-03-24 15:00
 * @note 干什么的呢？
 **/

function newFunc() {
  let constr = Array.prototype.shift.call(arguments);
  var obj = Object.create(constr.prototype)
  let result = constr.apply(obj, params);
  return typeof ret === 'Object' && result !== null ? result : obj
}
function Food(foodName){
  this.foodName=foodName;
  return 1
}
new Food('土豆丝');



function deepCopy(target,map=new WeakMap()){
  if(map.has(target))return map.has(target)
  let obj;
  if(target instanceof Object){
    if(Array.isArray(target)){
      obj=[]
    }
    if(typeof target === 'function') {
      obj=function (...args){
        return target.apply(this,args)
      }
    }
    if(target instanceof  Date) return new Date(target)
    if(target instanceof RegExp) return new RegExp(target.source,target.flags)
    let keys=Reflect.ownKeys(target);
    for(let key of  keys){
      if(Object.getOwnPropertyDescriptor(target,key).enumerable){
        obj[key]=target[key]
      }
    }
    return obj
  }else{
    return target
  }


}
