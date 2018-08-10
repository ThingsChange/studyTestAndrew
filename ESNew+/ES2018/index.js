/**
 *
 * @author  56477
 * @create 2018-08-06 17:06
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 **/
// 对象所有的方法遍历对象属性的顺序：
//a、首先遍历所有属性名为数字的属性，按照数字排序
//b、其次遍历所有属性名为字符串的属性，按照生成时间顺序排序
//c、最后遍历所有属性名为Symbol的属性，按照生成时间顺序排序
let a={
  [Symbol(0)]:1,
  b:2,
  10:0,
  2:-2,
  a:1
}
//自身所有可美剧的属性，不包含Symbol属性
Object.keys(a);//["2", "10", "b", "a"]
//自身的所有属性
Reflect.ownKeys(a);//["2", "10", "b", "a", Symbol(0)]
/*
* 1、Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历不包含Symbol属性的键值。
* */
Object.values(a)//[-2, 0, 2, 1]
//创建的属性默认不可枚举   原型链上有的属性非自身的也不会遍历出来
var obj=Object.create(a,{x:{value:1}});
Object.values(obj)//[]
var obj=Object.create(a,{x:{value:1,enumerable:true}});
Object.values(obj)//[1]
Object.values('abc')// ["a", "b", "c"]
/*
* 2、Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值对数组。
* */
Object.entries(a);  //   [["2", -2],["10",0],["b", 2],["a", 1]]
for(let [key,value] of Object.entries(a)){//2 -2      10 0     b  2   a  1
}
