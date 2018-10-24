/**
 *
 * @author  56477
 * @create 2018-10-24 16:33
 * @note 干什么的呢？
 **/

async function a() {
  console.log('step into a');
  await b();
  console.log('leave a')
}
async function b() {
  console.log('step into b');
  await c();
  console.log('x');
  var name = await 1;
  console.log('leave b');
}

async function c() {
  console.log('step into c');
  var name = await new Promise(function(res) {
    res('LeeeeeM');
  });
  console.log('name', name);
  name = await 'leeeeem';
  console.log('name', name);
  console.log('leave c');
}

a();
new Promise(function(resolve) {
  console.log('promise a');
  resolve(1);
  console.log('leave a promise');
}).then(function(res) {
  console.log(res);
  return 2;
}).then(function(res) {
  console.log(res);
  return 3;
}).then(function(res) {
  console.log(res);
  return 4;
}).then(function(res) {
  console.log(res);
  return 5
}).then(function(res) {
  console.log(res);
  return 6;
}).then(function(res) {
  console.log(res);
  return 7;
}).then(function(res) {
  console.log(8);
});
