/**
 *
 * @author  晴云
 * @create 2018-12-07 14:29
 * @note 干什么的呢？
 **/
  async function getA() {
      var a=await sleep(1);
      var b=await sleep(2);
      var c=await sleep(3);
      return '醒来';
  }
  const sleep=timeout=>{
    return new Promise(resolve=>setTimeout(resolve,timeout*1000))
  }
  getA().then(res=>console.log(res))
// async 函数返回的是一个Promise 对象，必须等到内部所有的await命令的Promise对象执行完毕，才会发生状态改变
// await命令后面跟着的可以是promise对象，也可以是常量，如果不是Promise对象的话，也会被转换成一个立即Resolve的Promise对象。
// Async函数难在错误处理上
async function getB() {
  var a=await Promise.reject('error');
  var b=await 1;
  return b;
}
getB().then(res=>console.log(b))


async function newGetB() {
  try{
    var a=await Promise.reject('error');
    console.log(2);
  }catch(e){
    console.log(e)
  }
  var b=await 1;
  return b;
}
newGetB().then(res=>console.log(res))
























