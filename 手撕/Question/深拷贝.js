/**
 *
 * @author  晴云
 * @create 2021-06-10 16:18
 * @note 尝试下深拷贝？
 **/
function deepCopy(target,map = new WeakMap()){
  if(map.has(target)) return map.get(target);
  let res = {}
  if(target instanceof  Object){
    if(Array.isArray(target)){
      res = [];
    }else if(target instanceof Function){
      res = function (...args){
        return target.applly(this,args)
      }
    }else if(target instanceof  RegExp){
        res =new RegExp(target.source,target.flags)
    }else if(target instanceof  Date){
      res  =new Date(target)
    }
    map.set(target,res);
    Reflect.ownKeys(target).filter(v=>target.propertyIsEnumerable(v)).forEach(key=>{
      res[key] = deepCopy(target[key],map)
    })
    return res;
  }else {
    return  target
  }
}
