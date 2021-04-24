/**
 *
 * @author  晴云
 * @create 2021-03-24 23:41
 * @note 干什么的呢？
 **/

class Person{
  constructor(name) {
    this.name=name
  }
  // @autoRun()
  getPersonName(){
    console.log('这里是 this 的结果-------------', this)
    return this.name
  }
}
const person = new Person('张三')
const fn =person.getPersonName;
console.log('这里是 fn 的结果-------------', fn)
fn()


// for(let i of  Array(10)){
//   let i=3;
//   console.log('这里是 i 的结果-------------', i)
// }
