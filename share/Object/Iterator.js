/**
 *
 * @author  56477
 * @create 2018-08-15 9:39
 * @PROJECT_NAME staff - wlj
 * @note 遍历对象
 **/
var a={x:1,[Symbol.for('原型链的Symbol')]:'0'};
var b=Object.create(a,{
  y:{
    value:2,
    enumerable:true
  },
  z:{
    value:'3'
  },
  [Symbol.for('Symbol可枚举')]:{
    value:'4',
    enumerable:true
  },
  [Symbol.for('Symbol不可枚举')]:{
    value:'5'
  }
})
//for ... in ES5的 自身以及原型链可枚举的属性
for (let attr in b){
  console.log(attr) //y   x
}
//Object.keys()  ES5的  自身可枚举的属性
var c=Object.keys(b); //c :['y']

//Object.getOwnPropertyNames() : 用来获取对象自身的全部(非Symbol类型)属性名
Object.getOwnPropertyNames(b)// ["y", "z"]
//获取自身所有Symbol类型的属性
Object.getOwnPropertySymbols(b)//[Symbol(Symbol可枚举), Symbol(Symbol不可枚举)]
//获取自身所有属性
Reflect.ownKeys(b) //["y", "z", Symbol(Symbol可枚举), Symbol(Symbol不可枚举)]
//等同于for in 循环
Reflect.enumerate(b)
