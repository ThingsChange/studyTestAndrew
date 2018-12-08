/**
 *  created by qingyun
 *  time: 2018/12/8  19:51
 *  note : 描述作用
 */

Promise.resolve('foo')
  .then(function(string) {
    return new Promise(function(resolve, reject) {
      console.log(1);
      console.log(string,'我是第1个then');
      setTimeout(function() {
        string += 'bar';
        resolve(string);
      }, 1);
    });
  })
  .then(function(string) {
    setTimeout(function() {
      string += 'baz';
      console.log(string,'我是第二个then');
    }, 1)
    return string;
  })
  .then(function(string) {
    console.log("Last Then:  oops... didn't bother to instantiate and return " +
      "a promise in the prior then so the sequence may be a bit " +
      "surprising");
    console.log(string,'我是第三个then');
  })
  .then(function (string) {
  console.log(123,'我是第四个then');
})
console.log(0)
setTimeout(function () {
  console.log('我是最先输出的setTimeout吗');
},0)
// 0
//1
// 我是最先输出的setTimeout吗
// Last Then:  oops...
// foobar
// 123
// foobarbaz
