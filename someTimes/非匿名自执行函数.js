/**
 *
 * @author  晴云
 * @create 2021-07-12 8:20
 * @note 干什么的呢？
 **/

/*var b =10 ;

(function b(){
  console.log('这里是 b 的结果-------------', b)
  b=5;
  console.log('这里是 window.b 的结果-------------', window.b)
  var b =20
  console.log('这里是 b 的结果-------------', b)
})()*/


/*let obj = {
  age:18,
  foo:function (func){
    func();
    arguments[0]()
  }
}
var age =10;
function fn(){
  console.log('这里是 this 的结果-------------', this)
  console.log('这里是 this.age 的结果-------------', this.age)
}
obj.foo(fn);*/




var obj = {
  age:18,
  foo:function (func,age=11){
    func();
    arguments.age=2
    console.log('这里是 arguments 的结果-------------', arguments)
    arguments[0]()
  }
}
var age =10;
function fn(){
  // console.log('这里是 this 的结果-------------', this)
  console.log('这里是 this.age 的结果-------------', this.age)
}
obj.foo(fn);
