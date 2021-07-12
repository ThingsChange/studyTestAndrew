function sayHello(people) {
    return "hello" + people;
}
// let user='Tom'
var user = {
    name: 'tom',
    sex: 1
};
function simpleExample(a) {
    var y = 1;
    var x = (y = a);
    console.log('这里是 x 的结果-------------', x);
    var b = a; // COMPILATION ERROR: undefined is not assignable to number.
    var c = a; // OK
    console.log('这里是 c 的结果-------------', c);
}
simpleExample(undefined);
console.log('这里是 sayHello 的结果-------------', sayHello(user.name));
