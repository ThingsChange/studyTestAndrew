/**
 *
 * @author  56477
 * @create 2018-08-14 10:48
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 **/
// 14题//v,i,a  当前值，当前索引，当前数组
[1,2,3].forEach((v,i,a)=>{
  console.log(v,i,a);
})//没有返回值，不能打断，
  [1,2,3].map((v,i,a)=>{
    return v*2;
})//[2,4,6]，返回数组，如果原数组稀缺，返回的照旧稀缺


15：
//没有返回值。$.each()里面的匿名函数支持2个参数：第一个是索引，第二个是值
$.each( ["a","b","c"], function(i, n){
  console.log( i + ": " + n );
});
// 有返回值，可以return 出来。.map()里面的匿名函数支持2个参数第一个是值，第二个是键（索引）
var arr=$.map( [0,1,2], function(n,i){
  return n+i;
});
console.log(arr);
//[ 0, 2, 4 ]
$.map({"name":"Jim","age":17},function(n,i){
  console.log(n+":"+i);
});
//Jim:name
//17:age
16：
19：  [...new Set([1,2,3,1,2,3])]   //[1,2,3]

