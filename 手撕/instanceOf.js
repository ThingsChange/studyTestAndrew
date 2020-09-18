/**
 *
 * @author  晴云
 * @create 2020-09-17 22:39
 * @note 干什么的呢？
 **/
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
function A(){

}
var a=new A();
  function B() {

  }
  var b=new B()
console.log('这里是 _instanceOf(a,A) 的结果-------------', _instanceOf(a,A))
console.log('这里是 _instanceOf(a,A) 的结果-------------', _instanceOf(a,B))
console.log('这里是 _instanceOf(a,A) 的结果-------------', _instanceOf(Object.create(a),A))
