/**
 *
 * @author  晴云
 * @create 2020-10-31 14:43
 * @note 柯里化？
 **/
//    add(1)(2)(3)=6
//add(1)(2,3)=6;
//add(1)(2,3)()=6
/*
function currify(...args) {
  let params = args;
  let fn = function (...innerArgs) {
    params = [...args, ...innerArgs]
    return currify(...params)
  }
  fn.toString = () => params.reduce((prev, value) => prev + value, 0)
  if(!args.length)return fn.toString();
  return fn;
}

var a = currify(1)(2)(3)
b = currify(1)(2, 3)
c = currify(1)(2, 3)()
console.log(currify(1)(2)(3),currify(1)(2)(3).toString())


*/







/*
function curry(fn) {
  // 保存预置参数
  const presetArgs = [].slice.call(arguments, 1)
  // 返回一个新函数
  function curried () {
    // 新函数调用时会继续传参
    const restArgs = [].slice.call(arguments)
    const allArgs = [...presetArgs, ...restArgs]
    return curry.call(null, fn, ...allArgs)
  }
  // 重写toString
  curried.toString = function() {
    return fn.apply(null, presetArgs)
  }
  return curried;
}

function dynamicAdd() {
  return [...arguments].reduce((prev, curr) => {
    return prev + curr
  }, 0)
}
var add = curry(dynamicAdd);*/



function add(){
  var toatalArguments = [...arguments];
  var currify = function (){
    toatalArguments.push(...arguments)
    return currify;
  }
  currify.toString = function (){
  return   toatalArguments.reduce((vv ,v) => {
      return vv+v;
    } )
  }
  return currify;
}

add(1)(2)(3)(4) // 10
add(1, 2)(3, 4)(5, 6) // 21
console.log('这里是 add(1, 2)(3, 4)(5, 6) 的结果-------------', add(1, 2)(3, 4)(5, 6))
