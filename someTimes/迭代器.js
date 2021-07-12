/**
 *
 * @author  晴云
 * @create 2021-07-07 11:16
 * @note 干什么的呢？
 **/
let str =new String('hi')
str[Symbol.iterator] = function (){
  let index = 0;
  let len = str.length;
  return {
    next:function (){
        if(index<len){
          let cur=str.slice(index,index+1)
          index++;
          return {
            value :String.fromCharCode(cur.charCodeAt()^32),
            done:false
          }
        }else{
          return {
            value: undefined,
            done: true
          }
        }
    },
    status:true
  }
}
console.log('这里是  的结果-------------', [...str])
