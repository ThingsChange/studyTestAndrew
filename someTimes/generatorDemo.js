/**
 *
 * @author  晴云
 * @create 2021-09-01 9:50
 * @note 干什么的呢？
 **/

function*  fib(max){
  let t,a=0,b=1,n=0;
  while (n<max){
    yield a;
    [a,b] = [b,a+b]
    n++
  }
  return;
}
let  result=fib(5);
console.log('这里是   result.next()  ------------', result.next())
console.log('这里是   result.next()  ------------', result.next())
console.log('这里是   result.next()  ------------', result.next())
