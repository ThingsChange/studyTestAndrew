function * testG(){
const data=yield getData();
  console.log('这里是   data  ------------', data)
  const data2 = yield getData();
  console.log('这里是   data2  ------------', data2)
  return 'success'
}
function getData(){
  return new Promise(resolve => {
    setTimeout(()=>resolve('data'),1000)
  })
}

let gen = testG();
console.log('这里是 gen 的结果-------------', gen)
/*
let a=gen.next();
console.log('这里是   a  ------------', a)
let b=gen.next('测试');
console.log('这里是   b  ------------', b)
let c=gen.next(b);
console.log('这里是   c  ------------', c)
console.log('这里是   gen  ------------', gen)*/

/*---------------------------------我们要是实现的效果----------------------------------------*/

/*
var dataPromise = gen.next()
console.log('这里是   dataPromise  ------------', dataPromise)
dataPromise.value.then((value1) => {
  console.log('这里是 value1 的结果-------------', value1)
  // data1的value被拿到了 继续调用next并且传递给data
  var data2Promise = gen.next(value1)
  // console.log('data: ', data);
  // 此时就会打印出data
  data2Promise.value.then((value2) => {
    // data2的value拿到了 继续调用next并且传递value2
    gen.next(value2)
    // console.log('data2: ', data2);
    // 此时就会打印出data2
  })
})*/

/*----------------------------------最终实现---------------------------------------*/
function asyncToGenerator(generatorFunc){
  return function (){
    const gen = generatorFunc.apply(this,arguments)
    return new Promise((resolve,reject)=>{
        function step(key,arg){
          let generatorResult ;
          try{
            generatorResult =  gen[key](arg)
          }catch(error){
            reject(error)
          }
          const {value,done} = generatorResult;
          if(done){
            return resolve(value)
          }else{
            return Promise.resolve(value).then(
              function onResolve(val){
                step('next',val)
              },
              function onReject(err){
                step('throw',err)
              }
            )
          }
        }
        step('next')
    })
  }
}
let res = asyncToGenerator(testG);
console.log('这里是   res  ------------', res())

new Promise((resolve, reject)=>{

})
