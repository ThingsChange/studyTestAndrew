/**
 *
 * @author  56477
 * @create 2018-10-22 8:44
 * @note 干什么的呢？
 **/

var x=1;
/*new Promise((resolve,reject)=>{
  resolve(x);
}).then((x)=>{
  console.log(x);
})*/
Promise.resolve(x).then((x)=>{
  console.log(x);
})
x++;
console.log(x);
Promise.resolve(1)

  .then((x) => x + 1)

  .then((x) => { throw new Error('My Error') })

  .catch(() => 1)

  .then((x) => x + 1)

  .then((x) => console.log(x))

  .catch(console.error)
