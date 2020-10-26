/**
 *
 * @author  晴云
 * @create 2020-09-18 22:21
 * @note 干什么的呢？
 **/

function flat(arr){
  return (arr??[]).reduce((prev,item)=>prev.concat(Array.isArray(item)?flat(item):item),[])
}
a=[1,[2,3,[4,5]]]
console.log(flat(a))
