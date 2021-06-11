/**
 *
 * @author  晴云
 * @create 2021-06-11 11:06
 * @note 实现instanceof
 **/
function _instanceof(target,classObj){
  if(target === null) return false
  if(classObj ===null || !['object','function'].includes(typeof classObj)) throw new Error('右侧数据不合法')
  let proto= Object.getPrototypeOf(target);
  while(true){
    if(!proto)return false;
    if(proto === classObj.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false
}
