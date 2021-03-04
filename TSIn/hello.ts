function sayHello(people: string) {
  return `hello${people}`
}
// let user='Tom'
let user={
  name:'tom',
  sex:1,
}
console.log('这里是 sayHello 的结果-------------', sayHello(user.name))
