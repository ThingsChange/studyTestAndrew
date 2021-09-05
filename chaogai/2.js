class A extends Array {
  static jingtai(){
    
  }
  constructor() {
    super();
  }
  protoMethod(){
    console.log('这里是 原型方法 的结果-------------', 原型方法)
  }
}
let a = new A(1, 2, 3, 4, 5);
console.log(a)
let a2 = a.filter(v => v < 3)
console.log(a2)
console.log(a instanceof Array); // true
console.log(a instanceof A); // true

console.log(a2 instanceof Array)
console.log(a2 instanceof A)


