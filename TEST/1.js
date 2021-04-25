/**
 *
 * @author  晴云
 * @create 2021-04-25 0:21
 * @note 干什么的呢？
 **/

function add(a) {
  function sum(b) { // 使用闭包
    a = b ? a + b : a; // 累加
    return sum;
  }
  sum.toString = function() { // 只在最后一次调用
    return a;
  }
  return sum; // 返回一个函数
}
add(1)              // 1
add(1)(2)           // 3
add(1)(2)(3)        // 6
add(1)(2)(3)(4)     // 10

const person={
  name:'ss',
  getName:()=>{
    console.log('这里是 this.ss 的结果-------------',this, this.name)
  }
}
person.getName();

const btn = document.getElementById('btn')
btn.addEventListener('click',()=>{
  console.log('这里是 this === window 的结果-------------', this === window)
})
