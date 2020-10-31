/**
 *
 * @author  晴云
 * @create 2020-10-31 14:43
 * @note 柯里化？
 **/
//    add(1)(2)(3)=6
//add(1)(2,3)=6;
//add(1)(2,3)()=6
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
