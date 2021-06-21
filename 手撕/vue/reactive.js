/**
 *
 * @author  晴云
 * @create 2021-06-16 9:33
 * @note 干什么的呢？
 **/

function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}
function hasOwn(target,key){
  return target.hasOwnProperty(key);
}

//原对象：代理过的对象
let toProxy = new WeakMap();
//代理过的对象：原对象
let toRaw = new WeakMap();

function reactive(target) {
  return createReactiveObject(target);
}

function createReactiveObject(target) {
  if (!isObject(target)) {
    return target
  }
  let proxy = toProxy.get(target)
  if (proxy) {
    return proxy
  }
//  防止代理过的对象再次被代理
  if (toRaw.has(target)) {
    return target
  }
  let baseHandler = {
    get(target,key,receiver){
      let res = Reflect.get(target,key,receiver)
      //收集依赖、订阅 把当前的key 和 effect 做映射关系
      track(target,key)
      //在get 取值的时候去判断该值是否是一个对象，如果是则递归（这里相比于Vue2中的默认递归，其实是一种优化）
      return isObject(res)?reactive(res):res;
    },
    set(target,key,value,receiver){
    //    这里需要区分是新增属性还是修改属性
      let haskey = hasOwn(target,key)
      let oldVal = target[key]
      let res = Reflect.set(target,key,value,receiver);
      if(!haskey){
        trigger(target,'add',key)
      }else if(oldVal !== value){
        trigger(target,'set',key)
      }
      return res;
    },
    deleteProperty(target, key) {
      let res = Reflect.deleteProperty(target,key)
      return res;
    }
  }
  let observed = new Proxy(target,baseHandler);
  toProxy.set(target,observed)
  toRaw.set(observed,target)
  return observed
}

//effect
let activeEffectStacks = [] ;
//target :map:{type:effect}
let targetsMap = new WeakMap();
function track(target,key){
  let effect = activeEffectStacks[activeEffectStacks.length -1];
  if(effect) {
    let depsMap = targetsMap.get(target);
    if(!depsMap){
      targetsMap.set(target,(depsMap = new Map()))
    }
    let deps = depsMap.get(key);
    if(!deps){
      depsMap.set(key,deps = new WeakMap())
    }
    if(!deps.has(effect)){
      deps.add(effect)
    }
  }
}
function trigger(target,key){
  let depsMap = targetsMap.get(target)
  if(depsMap){
      let deps = depsMap.get(key)
    if(deps){
      deps.forEach(effect=>{
        effect();
      })
    }
  }
}

// 响应式 副作用
function effect(fn) {
  const rxEffect = function () {
    try {
      // 捕获异常
      // 运行fn并将effect保存起来
      activeEffectStacks.push(rxEffect);
      return fn();
    } finally {
      activeEffectStacks.pop();
    }
  };
  // 默认应该先执行一次
  rxEffect();
  // 返回响应函数
  return rxEffect;
}

let obj = reactive({ name: "cosen" });
effect(() => {
  console.log(obj.name);
});
obj.name = "senlin";
obj.name = "senlin";
