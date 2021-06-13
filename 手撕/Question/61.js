/**
 *
 * @author  晴云
 * @create 2021-06-08 10:09
 * @note 修改test 让没1s输出一个
 **/

const list = [1,2,3]
const square = num => {
  return new Promise((resolve,rejected)=>{
    setTimeout(()=>{resolve(num*num)},1000)
  })
}
function  test(){
  list.forEach(async x=>{
    const res = await square(x)
    console.log('这里是 res 的结果-------------', res)
  })
}
/*async function  test(){
  for await (let item of list){
    const res = await square(item)
    console.log('这里是 res 的结果-------------', res)
  }
}*/
test()
