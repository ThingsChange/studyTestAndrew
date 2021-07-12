/**
 *
 * @author  晴云
 * @create 2021-07-06 8:36
 * @note 干什么的呢？
 **/

console.log('这里是 {}+[] 的结果-------------', {}+[])
console.log('这里是 []+{} 的结果-------------', []+{})
foo: for (var i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    if (i * j >=3 ) {
      console.log('stopping', i, j)
      break foo
    }
    console.log(i, j)
  }
}
