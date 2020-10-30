/**
 *
 * @author  晴云
 * @create 2020-10-28 9:37
 * @note 干什么的呢？
 **/

var a={
  x:()=>{
    console.log('这里是 this 的结果-------------', this)
    console.log(this===a)
  }
}
a.x();
let b=a.x;
b();

var c=1;
{
  console.log('这里是 c 的结果-------------', c)
  let c=2
}



