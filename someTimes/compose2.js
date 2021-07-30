/**
 *
 * @author  晴云
 * @create 2021-07-28 11:18
 * @note 干什么的呢？
 **/

function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);

console.log(a(1))

function  compose(...arg){
  // return  (n)=>arg.reduce((a,b)=>b(a),n)
  return arg.reduce((a,b)=>(...args)=>a(b(...args)))
}
