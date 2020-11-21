function func(a) {
  this.a = a
}
const obj={}
let bar = func.bind(obj)
bar(2)
console.log(obj.a)

//todo 此处new的优先级改变this的值要比其他的高。
let obj2 = new bar(3);
console.log(obj2.a)
console.assert(obj!==obj2,'对')
