/**
 *
 * @author  晴云
 * @create 2021-08-09 14:48
 * @note 干什么的呢？
 **/

var a=()=> new Promise((resolve,reject)=>{
      return fetch('http://dohko.m.hualala.com/orh52/food/menu?groupID=11157').then(response=>{
        console.log('这里是 response 的结果-------------', response)
        throw  new Error(response)
      }).then(res=>{
        console.log('这里是 res 的结果-------------', res)
      }).catch(error=>{
        console.log('这里是 error 的结果-------------', error)
      })
})
a();
