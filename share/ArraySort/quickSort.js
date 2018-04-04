/**
 *
 * @author  56477
 * @create 2018-03-29 16:09
 * @note 快速排序法
 **/
//快速排序（Quicksort）的Javascript实现
let   quickSort=function(arr){
    let length=arr.length;
    if(length<=1) return arr
    //选择基准
    let pivotIndex=Math.floor(length/2)
    let pivot=arr.splice(pivotIndex,1)[0];
    let  left=[];
    let right=[];
    for(let i=0;i<arr.length;i++){
        if(arr[i]<pivot){
            left.push(arr[i])
        }else{
            right.push(arr[i]);
        }
    }
    console.log(left);
    return quickSort(left).concat([pivot],quickSort(right))
}
let a=[232,12,46,76,87,3,2,15,34,643,980]
quickSort(a);