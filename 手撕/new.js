/**
 *
 * @author  晴云
 * @create 2021-03-24 15:00
 * @note 干什么的呢？
 **/

function newFunc() {
  let constr = Array.prototype.shift.call(arguments);
  if(!constr.prototype) throw new Error(constr+ 'is not a constructor')
  var obj = Object.create(constr.prototype)
  let result = constr.apply(obj, params);
  return typeof ret === 'Object' && result !== null ? result : obj
}
function Food(foodName){
  this.foodName=foodName;
  return 1
}
new Food('土豆丝');

function Person(){
  return {x:1}
}
function Student(){
  return null
}

console.log('这里是 new Person() 的结果-------------', new Person());
console.log('这里是 new Student() 的结果-------------', new Student());
console.assert(23>22,'对1')
console.assert(23<22,'对2')
