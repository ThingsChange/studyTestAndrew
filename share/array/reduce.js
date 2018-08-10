
/**
 *
 * @author  56477
 * @create 2018-04-13 16:42
 * @note 干什么的呢？
 **/

var countOccurrences1 = (arr, obj) => arr.reduce((a, v,i,array) =>obj[v]? a + 1 : a + 0, 0);
//const nestedArr = [1, 2, [3, 4, [5, 6]]];
const flatten=arr=>{
  arr.reduce((result,v,i,a)=>result.push(Array.isArray(v)?flatten(v):v),[])
}


var arr = [1, [2, [3, 4]]];
var flatten=(arr)=>{
   arr.reduce((result,v,i,a)=>
     result.concat(Array.isArray(v)?flatten(v):v)
  ,[])
}
console.log(flatten(arr));
var arr = [1, [2, [3, 4]]];
function flatten(arr){
  return arr.reduce(function(prev, cur){
    return prev.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
console.log(flatten(arr));
