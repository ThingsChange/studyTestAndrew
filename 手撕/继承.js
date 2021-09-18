/**
 *
 * @author  晴云
 * @create 2021-09-19 0:03
 * @note 干什么的呢？
 **/
function SuperType(name) {
  this.name = name;
  this.colors = ["red","blue","green"]
  this.say = () => {
    console.log(this.colors);
  };
}
SuperType.prototype.sayName = function() {
  console.log(this)
  console.log('这里是 this.name 的结果-------------', this.name)
};
function Children(name,age) {
  SuperType.call(this,name);
  this.age = age;
}
Children.prototype = Object.create(SuperType.prototype);
Children.prototype.constructor = Children;
// let child = new Children("法外狂徒张三");
// console.log(child.name);
// child.say();
// child.sayName();
