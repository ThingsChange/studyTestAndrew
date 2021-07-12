/**
 *
 * @author  晴云
 * @create 2021-07-12 9:20
 * @note 有个粑粑用？
 **/
var a = 0;
var b = async () => {
  // a = a + await 10;
  a = await 10 + a;
  console.log('2', a)
}
b();
a++;
console.log('这里是 1,a 的结果-------------', 1, a)
