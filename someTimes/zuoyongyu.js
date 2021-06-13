/**
 *
 * @author  晴云
 * @create 2021-06-07 9:31
 * @note 干什么的呢？
 **/

function z(){
  var x = 1
  if(b = function f(){}){
    x += typeof b
  }
  if(function f(){}){
    x += typeof f
  }

  console.log(x)
}
z()
/*


if(z,function a(){}){
  console.log('这里是 a 的结果-------------', a)
}
*/

if(false){
  function f(){

  }
}
console.log('这里是 typeof f 的结果-------------',  typeof f)
