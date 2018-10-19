/**
 *
 * @author  56477
 * @create 2018-08-28 15:06
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 **/
var oArray = [8, 4, 5, 7, 1, 3, 6, 2]
var mergeSort=function (arr) {
  if(arr.length<=1){
    return arr;
  }
  var length=arr.length;
  var mid=Math.floor(length/2)
  var left=arr.slice(0,mid)
  var right=arr.slice(mid )
  hebing(mergeSort(left),mergeSort(right));
}
function hebing(left,right) {
  let returnArr=[];
  while(left.length>0&&right.length>0){
    if(left[0]>=right[0]){
      returnArr.push(right.shift());
    }else{
      returnArr.push(left.shift());
    }
  }
  return result.concat(left).concat(right)
}


function bubbleSort(arr) {
  if (arr.length < 1) {
    return arr;
  }
  let temp = arr.length;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < temp - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
