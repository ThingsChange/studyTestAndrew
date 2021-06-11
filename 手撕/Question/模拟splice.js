/**
 *
 * @author  晴云
 * @create 2021-06-09 10:23
 * @note 干什么的呢？
 **/

Array.prototype.spliceNew=function (index,deleteCount,...args){
  let arr = this,res=[];
let len = arr.length;
if(index >=len) index =len;
res = arr.slice(index,index+deleteCount);
this = arr.slice(0,index+1).concat(...args).concat(arr.slice(index+deleteCount))
return res;
}
let a=[1,2,3]
a.spliceNew(1,1,5)
console.log('这里是 a 的结果-------------', a)
