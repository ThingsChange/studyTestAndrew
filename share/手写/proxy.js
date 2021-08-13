/**
 *
 * @author  晴云
 * @create 2021-06-04 17:42
 * @note 干什么的呢？
 **/

let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value,receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty',attribute);
    attribute = {value :'B'}
    Reflect.defineProperty(target, key, attribute);
    console.log('这里是 1 的结果-------------', 1)
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
obj.x='2'
console.log('这里是 obj,p 的结果-------------', obj.hasOwnProperty('a'),p,obj)
