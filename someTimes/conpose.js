/**
 *
 * @author  晴云
 * @create 2021-07-28 9:09
 * @note 干什么的呢？
 **/

function rawMethod(a){
  return a + 1;
}

function middleware1(next){
  return function(a){
    return next(a) + 1;
  }
}
function middleware2(next){
  return function(a){
    return next(a) + 1;
  }
}

function middleware3(next){
  return function(a){
    return next(a) + 1;
  }
}
var newMethod = compose(rawMethod, middleware3, middleware2);
var x = newMethod(1);
console.log('这里是 x 的结果-------------', x)
/*// 要求调用顺序： middleware2 -> middleware3 -> middleware. 结果 x = 3
var newMethod2 = applyMiddleWare(newMethod, middleware1);
var y = newMethod2(10);*/
// 要求调用顺序： middleware1 -> middleware2 -> middleware3 -> middleware. 结果 y = 13


/*function applyMiddleWare(...args){
  return function (val){
    let methods = args.reverse();
    let res =methods.reduce((vv,v)=>{
      return v(vv)
    },val)
    return res;
  }
}*/




/* function applyMiddleWare(...middlewares) {
  // 接收creatStore方法
  return function (createStore) {
    // 接收reducer和默认状态 ，用于创建仓库
    return function (reducer, defaultState) {
      //创建仓库
      const store = createStore(reducer, defaultState);
      let dispatch = () => {
        throw new Error("目前还不能使用dispatch")
      };

      const simpleStore = {
        getState: store.getState,
        // 这里不能写成dispatch: dispatch，否则一直是上面那个报错的dispatch
        // 也不能写成store.dispatch，否则一直是最原始的dispatch
        // 写成函数形式是为了保证引用地址一致
        dispatch: (...args) => dispatch(...args)
      }

      //给dispatch赋值
      //根据中间件数组，得到一个dispatch创建函数的数组
      const dispatchProducers = middlewares.map(mid => mid(simpleStore));
      // 在完成dispatch前，是调用不了simpleStore中的dispatch的，只有等包装完
      dispatch = compose(...dispatchProducers)(store.dispatch)
      return {
        ...store,
        dispatch,
      }
    }
  }

}*/
// 请实现该方法
  // 请实现该方法
function applyMiddleWare(originalMethod, ...args) {
  // middleware2(middleware3(rawMethod))(n)
    // 根据题目，需要如下处理函数：middleware3(middleware2(middleware1(rawMethod)))(n)
    // 这个函数层层嵌套，那么可以使用数组的reduce方法
    // 查看执行顺序，和reduce的顺序，这里除了第一个函数外，需要取相反方向，不能用sort，会改变原数组

    /*
    let funs = [].concat(originalMethod,args);
    let initFn = funs[0]
    let otherFn = []
    for(let i=funs.length-1;i>0;i--){
        otherFn.push(funs[i])
    }
    return otherFn.reduce((result, current) => {
        return current(result)
    },initFn)
    */

    // 上过面的方法只要执行 applyMiddleWare 就已经执行了他的参数方法
    // 所以 applyMiddleWare(newMethod, middleware1) 这里的23先于1执行
    // 那么就考虑将参数方法在包一层，在函数调用里执行
    let funs = [].concat(originalMethod,args)
    const len = funs.length
    if(len === 0){
      return arg => arg;
    }else if(len === 1){
      return funs[0]
    }else{
      console.log('这里是 funs 的结果-------------', funs)
      return funs.reduce((a, b) =>n=>b(a)(n))
    }
  }
function compose(...funcs) {
  if (funcs.length === 0) {
    return args => args; //如果没有要组合的函数，则返回的函数原封不动的返回参数
  } else if (funcs.length === 1) {
    //要组合的函数只有一个
    return funcs[0];
  }

  // redux官方写法，在下面附有步骤分析，非常巧妙
  // return funcs.reduce((a, b) => (...args) => a(b(...args)));

  // 这是可读性好一些的写法，和上面代码功能一样
  return function (...args) {
    let lastReturn = null; // 记录上一个函数返回的值
    for (let i = funcs.length - 1; i >= 0; i--) {
      const func = funcs[i];
      if (i === funcs.length - 1) {
        lastReturn = func(...args);
      } else {
        lastReturn = func(lastReturn);
      }
    }
    return lastReturn;
  }
}

  console.log('这里是 x 的结果-------------', x)
