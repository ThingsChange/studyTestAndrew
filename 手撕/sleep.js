/**
 *
 * @author  晴云
 * @create 2020-10-12 9:00
 * @note 干什么的呢？
 **/

function sleep(time){
  return  new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve();
    },time)
  })
}
async function autoRun() {
  console.time(1)
  console.log('这里是 来咯哦 的结果-------------', 1)
  await sleep(3000);
  console.log('这里是 睡醒之后 的结果-------------', 2)
  console.timeEnd(1)
}
autoRun()
