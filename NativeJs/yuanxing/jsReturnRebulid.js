/**
 * Created by wanglijun on 2016/12/14.
 *
 * Super {a: 1} 具有原型方法sayHello
 Object {a: 2}
 好了现在我们总结下 在构造函数中 return 基本类型 不会影响

 构造函数的值而 return 对象类型 则会替代构造函数返回该对象
 */


//直接 return
function A(){   return;}//{}
//返回 数字类型
function B(){   return 123;}//{}
//返回 string类型
function C(){   return "abcdef";}//{}
//返回 数组
function D(){   return ["aaa", "bbb"];}//["aaa", "bbb"]
//返回 对象
function E(){   return {a: 2};}// / 返回 Object {a: 2}
//包装类型
function F()//Number {[[PrimitiveValue]]: 123}A {}
{
    return new Number(123);
}

function Super(a) {
    this.a = a;
    return 123;
}
Super.prototype.sayHello = function () {
    alert('hello world');
}
function Super_(a) {
    this.a = a;
    return {a: 2};
}
Super_.prototype.sayHello = function () {
    alert('hello world1');
}
var a = new Super(1);
var a2 = new Super_(1);
console.log(a);
console.log(a2);
console.log(a.sayHello());
console.log(a2.sayHello());
