function sayHello(people: string) {
  return `hello${people}`
}
// let user='Tom'
let user={
  name:'tom',
  sex:1,
}

function simpleExample(a: number | undefined) {
  let y:number=1;
  let x:number= (y=a!)
  console.log('这里是 x 的结果-------------', x)
  const b: number = a; // COMPILATION ERROR: undefined is not assignable to number.
  const c: number = a!; // OK
  console.log('这里是 c 的结果-------------', c)
}
simpleExample(undefined);
console.log('这里是 sayHello 的结果-------------', sayHello(user.name))
