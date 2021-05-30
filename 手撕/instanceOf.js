/**
 *
 * @author  晴云
 * @create 2020-09-17 22:39
 * @note 干什么的呢？
 **/
// instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。instanceof
  function _instanceOf(obj,con) {
    if(obj===null) return false;
    if( !['object','function'].includes(typeof  con) || con===null) throw  new Error('Right-hand side of  _instanceof is not an object')
    let proto=Object.getPrototypeOf(obj)
  while (true){
      if(!proto) return false;
      if(proto===con.prototype)return true;
      proto=Object.getPrototypeOf(proto)
  }
  return false;
}

function _instanceOf(obj,con){
    if(obj === null )return false
    if(typeof obj !=='Object') throw new Error('左边不应该是基础数据类型')
  let pro = Object.getPrototypeOf(obj)
  while(true){
      if(!pro)return false
      if(pro === con.prototype )return true
      pro = Object.getPrototypeOf(pro)
  }
}


function A(){

}
var a=new A();
  function B() {

  }
  var b=new B()
console.log('这里是 _instanceOf(a,A) 的结果-------------', _instanceOf(a,A))
console.log('这里是 _instanceOf(a,A) 的结果-------------', _instanceOf(a,B))
console.log('这里是 _instanceOf(a,A) 的结果-------------', _instanceOf(Object.create(a),A))
