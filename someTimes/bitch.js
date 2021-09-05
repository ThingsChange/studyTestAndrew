/**
 *
 * @author  晴云
 * @create 2021-07-23 11:32
 * @note 干什么的呢？
 **/

/*
var a = 0;
var b= async ()=>{
  a= a+await  10
  console.log('这里是 2,a 的结果-------------', 2,a)
}
b()
a++;
console.log('这里是 1 的结果-------------', 1,a)
*/
let x={z:1}

function sidEffecting(ary){
  ary[0] = ary[2];
}
// function bar(a,b,c){
function bar(a,b,c){
  b={x:2}

  // console.log('这里是 this 的结果-------------', this===global)
  c = 10
  // arguments[1]=3
  // sidEffecting(arguments)
  console.log('这里是 a,b,c 的结果-------------', a,b,c,arguments)
  return a +b +c;
}
function demo(arg){
  arg.name = 'new Name'
}
console.log(bar(2,x,2))


