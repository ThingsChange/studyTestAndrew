/**
 *
 * @author  56477
 * @create 2018-07-31 10:52
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 **/
var oArray=[8,4,5,7,1,3,6,2]
function bubbleSort(arr){
  var len=arr.length;
  for(let i=0;i<len;i++){
    for(let j=0;j<len-1-i;j++){
      if(arr[j]>arr[j+1]){
        [arr[j],arr[j+1]]=[arr[j+1],arr[j]]
      }
    }
  }
  return arr;
}
bubbleSort(oArray);
