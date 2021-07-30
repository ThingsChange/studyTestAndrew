/**
 *
 * @author  晴云
 * @create 2021-07-23 11:32
 * @note 干什么的呢？
 **/

var a = 0;
var b= async ()=>{
  a= a+await  10
  console.log('这里是 2,a 的结果-------------', 2,a)
}
b()
a++;
console.log('这里是 1 的结果-------------', 1,a)
