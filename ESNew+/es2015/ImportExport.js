/**
 *
 * @author  晴云
 * @create 2021-03-10 16:17
 * @note 干什么的呢？
 **/
import {person} from "./export1.js";

person.name='李四';
console.log(person.name)
setTimeout(()=>{
  console.log('这里是 person.name 的结果-------------', person.name)
},12)

export {}
