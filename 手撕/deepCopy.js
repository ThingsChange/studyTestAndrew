/**
 *
 * @author  晴云
 * @create 2020-10-31 15:07
 * @note 干什么的呢？
 **/
function deepCopy(target, map = new WeakMap()) {
  if (map.has(target)) return map.get(target)
  let obj;
  if (target instanceof Object) {
    if (target instanceof Array) {
      obj = [];
    } else if (target instanceof Function) {
      obj = function (...args) {
        return target.apply(this, args)
      }
    } else if (target instanceof RegExp) {
      obj = new RegExp(target.source, target.flags)
    } else if (target instanceof Date) {
      obj=new Date(target)
    }else{
      obj={};
    }
    map.set(target,obj)
    let keys= Reflect.ownKeys(target);
    for(let key of keys){
      if(Object.getOwnPropertyDescriptor(target,key).enumerable){
        obj[key] =deepCopy(target[key],map)
      }
    }
    return obj
  }else{
    return target
  }
}
const a = {
  i: Infinity,
  s: "",
  bool: false,
  n: null,
  u: undefined,
  sym: Symbol(),
  obj: {
    i: Infinity,
    s: "",
    bool: false,
    n: null,
    u: undefined,
    sym: Symbol(),
  },
  array: [
    {
      nan: NaN,
      i: Infinity,
      s: "",
      bool: false,
      n: null,
      u: undefined,
      sym: Symbol(),
    },
    123,
  ],
  fn: function () {

    return "fn";
  },
  date: new Date(),
  re: /hi\d/gi,
};
let a2 = deepCopy(a);
console.log(a2 !== a);
console.log(a2.i === a.i);
console.log(a2.s === a.s);
console.log(a2.bool === a.bool);
console.log(a2.n === a.n);
console.log(a2.u === a.u);
console.log(a2.sym === a.sym);
console.log(a2.obj !== a.obj);
console.log(a2.array !== a.array);
console.log(a2.array[0] !== a.array[0]);
console.log(a2.array[0].i === a.array[0].i);
console.log(a2.array[0].s === a.array[0].s);
console.log(a2.array[0].bool === a.array[0].bool);
console.log(a2.array[0].n === a.array[0].n);
console.log(a2.array[0].u === a.array[0].u);
console.log(a2.array[0].sym === a.array[0].sym);
console.log(a2.array[1] === a.array[1]);
console.log(a2.fn !== a.fn);
console.log(a2.date !== a.date);
console.log(a2.re !== a.re);
