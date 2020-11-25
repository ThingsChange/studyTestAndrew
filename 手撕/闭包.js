/**
 *
 * @author  晴云
 * @create 2020-11-17 23:55
 * @note 干什么的呢？
 **/

foo(10)
function foo(num){
  console.log('这里是 foo 的结果-------------', foo)
  foo=num;
  console.log('这里是 foo 的结果-------------', foo)
}

console.log('这里是 foo 的结果-------------', foo)
foo=1
console.log('这里是 foo 的结果-------------', foo)

