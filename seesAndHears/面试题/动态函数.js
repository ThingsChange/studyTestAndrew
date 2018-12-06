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
