/**
 *
 * @author  56477
 * @create 2018-08-10 11:10
 * @PROJECT_NAME staff - wlj
 * @note how to clone a object？
 **/
//1、JSON.parse()//有个bug  内置类型，在序列化会丢失，如果有循环对象会报错
  //toJSON  方法的，以及Symbol类型数据


// 2、结构化克隆
/*
结构化克隆是一种现有的算法，用于将值从一个领域转移到另一个领域。
例如，只要调用postMessage将消息发送到其他窗口或WebWorker，就会使用它 。
关于结构化克隆的好处在于它处理循环对象并支持大量的内置类型 。
问题在于，在编写本文时算法不会直接暴露，只能作为其他API的一部分。
我想我们必须看看那些，我们不会...*/
// 完美兼容方案
// MessageChannel
// 正如我所说的，无论何时调用postMessage ，都会使用结构化克隆算法。
// 我们可以创建一个MessageChannel并发送消息。
// 在接收端，消息包含我们原始数据对象的结构化克隆。
function structuralClone(obj){
    return  new Promise((resolve,reject)=>{
      const  {port1,port2}=new MessageChannel();
      port2.onmessage=ev=>resolve(ev.data);
      port1.postMessage(obj);
    })
}
var obj={
  x:1,
  y:new Date('2018-08-10'),
  [Symbol.for('123')]:123,
  z:function () {
    console.log(1)
  },
  q:obj
}
async function  f() {
  var a=await structuralClone(obj)
console.log(a);
}
