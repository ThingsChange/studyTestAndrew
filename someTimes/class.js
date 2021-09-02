/**
 *
 * @author  晴云
 * @create 2021-08-27 8:50
 * @note 干什么的呢？
 **/

class zhizhang{
  //构造函数
  // 构造函数返回的对象会被用作实例化的对象如果没有什么引用新创建的this对象，那么这个对象会被销毁；
  //不过，如果返回的不是 this 对象，而是其他对象，那么这个对象不会通过 instanceof 操作符检测出跟类有关联，因为这个对象的原型指针并没有被修改
  //每个势力都对应着一个唯一的成员对象，这意味着所有成员都不会在原型上共享
  constructor(type) {
    //添加到this对象上的所有的内容都会存在于不同的实例上
    this.type=type
    //实例方法
    this.shier=function (){
    }
    if(type){
      return  {x:1}
    }
  }
  //设置函数
  set name(value){
    this.value = value
  }
  // 获取函数
  get name(){
    return this.value
  }
  //原型方法，定义在原型对象上
  action(){
    console.log('这里是 傻逼 的结果-------------', this.type)
  }
  //定义在类本身上
  static acornMore(){
    console.log('这里是  的结果-------------', '越多越好')
  }
  static bb(){
    console.log('这里是 bb 的结果-------------', 1)
  }
}
let a = new zhizhang('舔狗')
console.log('这里是 a 的结果-------------', a)
a.name = 1;
console.log('这里是 a 的结果-------------', a)

zhizhang.acornMore();
zhizhang.bb();
console.log('这里是 a instanseof 的结果-------------', a instanceof zhizhang)
class NC extends zhizhang{
    constructor(t) {
      super(t);
    }
    static bb(){
      super.bb();
    }
}
