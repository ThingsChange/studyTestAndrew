/**
 *
 * @author  晴云
 * @create 2020-09-18 20:36
 * @note 干什么的呢？
 **/

class A {
    constructor(count){
      this.count=count
    }
    valueOf(){
      return 2
    }
    toString(){
      return 'hello  toString'
    }
    [Symbol.toPrimitive](hint){
      if(hint==='number'){
        return 10
      }
      else  if(hint==='string'){
        return 'hello string toPrimitive'
      }
      return true;
    }
}
/*var a=new A();
console.log('这里是 `${a}` 的结果-------------', `${a}`)
console.log('这里是 String(a) 的结果-------------', String(a))
console.log('这里是 Number(a) 的结果-------------', Number(a))
console.log('这里是 +a 的结果-------------', +a)
console.log('这里是 a*20 的结果-------------', a*20)
console.log('这里是 a/20 的结果-------------', a/20)
console.log('这里是 a+"22" 的结果-------------', a+"22")
console.log('这里是 a==10 的结果-------------', a==2)*/

// a===1&&a===2&&a===3 为true

var value=1;
Object.defineProperty(global,'a',{
  get(){
    return value++
  }
})
console.log('这里是 a===1&&a===2&&a===3 的结果-------------', a===1&&a===2&&a===3)
