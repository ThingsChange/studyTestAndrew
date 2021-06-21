/**
 *
 * @author  晴云
 * @create 2021-06-21 9:23
 * @note 作用域的外部引用是在编译阶段根据代码的位置而定的
 *  执行上下文：变量环境，词法环境，outer，this
 *  已收录于基石-this-运行时
 **/
let x= 20;
function a(y){
  var x =10 ;
  return  b(y);
}

function b(y){
  // console.trace()
  return  x+y
}

console.log('这里是   b(10)  ------------', b(10))
