/**
 * Created by Andrew on 2017/5/11.
 */
/*
要求：分别可以去掉[1,1,2,3,1]和[{id:1,name:’aa’},{id:2,name:’bb’},{id:1,name:’aa’}]两个数组的重复值。
function sliceRepeat(arr){
//请在此填入代码。                                                  }
    sliceRepeat([1,1,2,3,1]);
    sliceRepeat([{id:1,name:’aa’},{id:2,name:’bb’},{id:1,name:’aa’}]);
*/

function sliceRepeat(arr) {
//请在此填入代码
 var result = [], objHash={}, hash = {},dataType;
 for (var i = 0, elem; (elem = arr[i]) != null; i++) {
  dataType=typeof elem;
  if(dataType=='object'){//表示疑惑，因为对象其实就不相等嘛
   objHash[elem['id']]=elem;
  }else{
   if (!hash[elem]) {
    result.push(elem);
    hash[elem] = true;
   }
  }
 }
 for (var item in objHash){
  result.push(objHash[item])
 }
 return result;
}
