/**
 *
 * @author  晴云
 * @create 2018-12-06 8:59
 * @note 干什么的呢？
 **/

// 给定对象，实现一个get函数，使得下面的调用可以输出正确的结果
const obj = { selector: { to: { toutiao: "FE Coder"} }, target: [1, 2, { name: 'byted'}]};

get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name');
// [ 'FE Coder', 1, 'byted']

function get(data,...args){
  const res=JSON.stringify(data);
  console.log(res)
  return args.map(item=>
    (new Function(`try { return ${res}.${item} } catch(e) {}`))()
  )
}
console.log(get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name'));






var a=1;
var b=2;
var c=[3,4,5]
var x = Object.assign(a,b,c)










var a = {
  b: 123,
  c: '456',
  e: '789',
}
var str=`a{a.b}aa{a.c}aa {a.d}aaaa`;

function gen(obj,attr){
  let str=JSON.stringify(obj);
  return new Function(`try{ return ${str}.${attr} } catch(e){ return z} `)
}
