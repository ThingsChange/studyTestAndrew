/**
 *
 * @author  56477
 * @create 2018-06-07 16:21
 * @PROJECT_NAME staff - wlj
 * @note User类
 **/
class User{
  constructor(users){
    this.users=users;
  }
  [Symbol.iterator](){
    let i=0;
    let users=this.users;
    return {
      next(){
        if(i<users.length){
          return {done:false,value:users[i++]}
        }
        return {done:true}
      }
    }
  }
}
const allUsers=new User([
  {name:'小明'},
  {name:'小张'},
  {name:'小李'},
])
for(let user of allUsers){
  console.log(user.name);
}
console.log([...allUsers])
