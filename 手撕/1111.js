/**
 *
 * @author  晴云
 * @create 2021-08-06 16:46
 * @note 干什么的呢？
 **/

class A{
  static instance
  name
  constructor(name){
    this.name = name
  }
  getName(){
    console.log(this.name)
  }
  static getInstance(name){
    if (!this.instance) {
      this.instance = new A(name)
    }
    return this.instance
  }
}

const a = A.getInstance('a')
const b = A.getInstance('b')
console.log(a==b)
