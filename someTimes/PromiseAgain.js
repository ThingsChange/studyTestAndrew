/**
 *
 * @author  晴云
 * @create 2020-12-09 8:34
 * @note 干什么的呢？
 **/
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(executor) {
    this._status = PENDING
    this._value = null;
    this._resolveQueue = [];
    this._rejectQueue = [];
    let _resolve = (val) => {
      let run = () => {
        if (this._status !== PENDING) return;
        this._status = FULFILLED;
        while (this._resolveQueue.length) {
          const fn = this._resolveQueue.shift();
          fn(val);
        }
      }
      setTimeout(run)
    }
    let _reject = val => {
      let run = () => {
        if (this._status !== PENDING) return;
        this._status = REJECTED;
        while (this._rejectQueue.length) {
          const fn = this._rejectQueue.shift();
          fn(val)
        }
      }
      setTimeout(run)
    }
    executor(resolveFun, rejectFun)
  }

  then(resolveFn, rejectFn) {
    //解决then的参数不是函数类型时，值需要穿透
    typeof resolveFn !== 'function' ? resolveFn = val => val : null;
    typeof rejectFn !== 'function' ? rejectFn = reason => {
      throw new Error(reason instanceof Error ? a.message : reason)
    } : null
    return new MyPromise((resolve, reject) => {
      const fulFilledFn = value => {
        try {
          let x = resolveFn(value)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(value)
        } catch (e) {
            reject(e)
        }
      }
      const rejectedFn=error=>{
        try{
          let x = rejectFn(error);
          x instanceof MyPromise?x.then(resolve,reject):resolve(x)
        }catch(e){
          reject(e)
        }
      }
      switch (this._status){
        case PENDING:
          this._resolveQueue.push(fulFilledFn);
          this._rejectQueue.push(rejectedFn);
          break
        case FULFILLED:
          fulFilledFn(this._value);
          break
        case REJECTED:
          rejectedFn(this._value);
          break
      }
    })
  }
  catch(rejectFn){
    return this.then(undefined,rejectFn);
  }
  finally(callBack){
    return this.then(
      value=>MyPromise.resolve(callBack()).then(()=>value),
      reason=>MyPromise.reject(callBack()).then(()=>throw reason)
    )
  }
  static resolve(value){
    if(value instanceof MyPromise) return value;
    return new MyPromise(resolve=>resolve(value))
  }
  static reject(reason){
    if(reason instanceof  MyPromise) return reason
    return new MyPromise((resolve,reject)=>reject(reason))
  }
  all(promiseArr){
    let res=[];
    let index=0;
    let len=promiseArr.length;
    return new MyPromise((resolve,reject)=>{
      promiseArr.forEach((p,i)=>{
        MyPromise.resolve(p).then(
          val=>{
            res[i] =val;
            index++;
            if(index === len){
              resolve(res)
            }
          },
          //有一个promise被reject时，则返回的Promise状态转变成reject
          error=>{
            reject(error)
          }
        )
      })
    })
  }
  race(promiseArr){
    return new MyPromise((resolve,reject)=>{
      for (let p of  promiseArr){
        MyPromise.resolve(p).then(
          value=>resolve(value),
          error=>reject(error)
        )
      }
    })
  }
  allSettled(promiseArr){
    return new MyPromise((resolve,reject)=>{
      let res=[];
      let index=0;
      let len=promiseArr.length;
      promiseArr.forEach((v,i)=>{
        MyPromise.resolve(v).then(
          value=>{
            res[i]=value;
            index++;
            if(index===len) resolve(res)
          },
          error=>{
            res[i]=error;
            index++;
            if(index===len) resolve(res)
          }
        )
      })
      if(!index){
        resolve([])
      }
    })
  }
}

