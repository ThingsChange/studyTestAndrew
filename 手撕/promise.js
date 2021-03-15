/**
 *
 * @author  晴云
 * @create 2020-08-28 11:40
 * @note  这是观察者模式
 * 收集依赖——>触发依赖——>取出以来执行
 * then收集依赖——>异步触发resolve——>resolve执行依赖
 * ￥￥￥￥Promise A+规范￥￥￥￥
 * 1、Promise本身是一个状态机。状态变化不可逆  pending ——> fullFilled || Rejected
 * 2、then方法接收两个可选参数，分别对应状态改变时触发的回调。then方法返回一个promise ,then可以被同一个promise调用多次
 **/
const PENDING = 'PENDING'
const FULFILLED = 'fulfilled'
const REJECTED = 'REJECTED'

class MyPromise {
  // executor()内部的异步任务被放入宏/微任务队列，等待执行
  constructor(executor)  {
    this._status = PENDING; // Promise状态
    this._value = undefined // 储存then回调return的值
    this._resolveQueue = [];// 成功队列, resolve时触发
    this._rejectQueue = []; // 失败队列, reject时触发
    // executor()的异步任务被执行，触发resolve/reject，从成功/失败队列中取出回调依次执行
    // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue,毕竟不固定就是window了。
    let _resolve = (val) => {
      //把resolve执行回调的操作封装成一个函数,放进setTimeout里,以兼容executor是同步代码的情况
      const run = ()=>{
        if (this._status !== PENDING) return; // 对应规范中的"状态只能由pending到fulfilled或rejected"
        this._status = FULFILLED;
        // 这里之所以使用一个队列来储存回调,是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次"
        // 如果使用一个变量而非队列来储存回调,那么即使多次p1.then()也只会执行一次回调
        while (this._resolveQueue.length) {
          const callback = this._resolveQueue.shift()
          callback(val)
        }
      }
      setTimeout(run)
    }
    // executor()的异步任务被执行，触发resolve/reject，从成功/失败队列中取出回调依次执行
    let _reject = val => {
      const run=()=>{
        if (this._status !== PENDING) return;
        this._status = REJECTED;
        while (this._rejectQueue.length) {
          const callback = this._rejectQueue.shift();
          callback(val);
        }
      }
      setTimeout(run)
    }
    // new Promise()时立即执行executor,并传入resolve和reject
    executor(_resolve, _reject);
  }

  /*
  * @Paramter resolveFn 成功回调
  * @Paramter rejectFn 失败回调
  * 被执行的时候，收集成功/失败回调，放入成功/失败队列
  * @return  需要返回一个promise，这样仓可以链式调用
  *   .then() 的回调需要拿到上一个 .then() 的返回值
  *   .then()  的回调需要书序执行；所以我们要等待当前Pormise状态变更后，在执行下一个then收集的回调，这里要求我们对then的返回值分类讨论
  * */
  then(resolveFn, rejectFn) {
    //解决值穿透&状态已变更的情况
    // 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
    typeof resolveFn !== 'function' ? resolveFn = value => value : null
    typeof rejectFn !== 'function' ? rejectFn = reason => {
      throw new Error(reason instanceof Error ? reason.message : reason);
    } : null;

    return new MyPromise((resolve, reject) => {
      //把resolveFn重新包装一下，再push 进resolve执行队列，这是为了能够获取回调的返回值进行类型分类
      const fulFilledFn = value => {
        try {
          //执行第一个(当前的)Promise的成功回调,并获取返回值
          let x = resolveFn(value);
          //分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
          //这里resolve之后，就能被下一个.then()的回调获取到返回值，从而实现链式调用
          x instanceof  MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      //把后续then收集的依赖都push进当前Promise的成功回调队列中(_rejectQueue), 这是为了保证顺序调用
      // this._resolveQueue.push(fulFilledFn);
      const rejectedFn = error => {
        try {
          let x = rejectFn(error);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      // this._rejectQueue.push(rejectedFn);
      switch (this._status) {
        //把后续then收集的依赖都push进当前Promise的回调队列中(_resolveQueue,_rejectQueue), 这是为了保证顺序调用
        case PENDING:
            this._resolveQueue.push(fulFilledFn);
            this._rejectQueue.push(rejectedFn);
            break;
        case FULFILLED:
            fulFilledFn(this._value)
            break
        case REJECTED:
            rejectFn(this._value)
            break;
      }
    })
  }
  // catch()方法返回一个Promise，并且处理拒绝的情况。它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。
  catch(rejectFn){
    return this.then(undefined,rejectFn);
  }
  finally(callback){
    return this.then(
      value=>MyPromise.resolve(callback()).then(()=>value), // MyPromise.resolve执行回调,并在then中return结果传递给后面的Promise
      reason=>MyPromise.resolve(callback()).then(()=>throw reason)
    )
  }
  static resolve(value){
    if(value instanceof  MyPromise) return value
    return new MyPromise(resolve=>resolve(value))
  }
  static reject(error){
    return new MyPromise((resolve,reject)=>reject(error))
  }
  all(promiseArr){
    let index=0;
    let result=[];
    return MyPromise((resolve,reject)=>{
      promiseArr.forEach((p,i)=>{
        // Promise.resolve(p)用于处理传入值不为Promise的情况
        MyPromise.resolve(p).then(
          val=>{
            index++;
            result[i]=val;
            //所有then执行后, resolve结果
            if(index === promiseArr.length){
              resolve(result)
            }
          },
          err=>{
            //有一个Promise被reject时，MyPromise的状态变为reject
            reject(err)
          }
        )
      })
    })
  }
  race(promiseArr){
    return new MyPromise((resolve,reject)=>{
      //同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
      for(let p of promiseArr){
        MyPromise.resolve(p).then( //Promise.resolve(p)用于处理传入值不为Promise的情况
          value=>resolve(value),//注意这个resolve是上边new MyPromise的
          error=>reject(error)
        )
      }
    })
  }
}
