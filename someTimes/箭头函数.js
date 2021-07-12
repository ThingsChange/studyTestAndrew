/**
 *
 * @author  晴云
 * @create 2021-07-06 16:09
 * @note 干什么的呢？
 **/

var x=2
var a={
  x:1,
  fuc:()=>{
    //该函数当前所在的上下文就是a所在的上下文，即window/global
    console.log('这里是 this 的结果-------------', this)
    console.log('这里是 this.x 的结果-------------', this.x)
  }
}
a.fuc();


var obj = {
  bar: function() {
    var x = (() => this);
    return x;
  }
};
var fn = obj.bar();
console.log(fn() === obj);
var fn2 = obj.bar;
console.log(fn2()() == global);




var a = 0;

if(true){
  // a();
  console.log('这里是 a,window.a 的结果-------------', a,window.a)
  a = 1;
  console.log('这里是 a,window.a 的结果-------------', a,window.a)
  function a(){
    console.log(a,111)
  }
  console.log('这里是 a,window.a 的结果-------------', a,window.a)
  a = 21;
  console.log('这里是 a,window.a 的结果-------------', a,window.a)
  console.log("里面",a);
}
console.log("外部",a);

