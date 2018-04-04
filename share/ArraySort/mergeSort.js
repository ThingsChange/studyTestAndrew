/**
 *
 * @author  56477
 * @create 2018-03-30 11:19
 * @note 干什么的呢？
 **/
//归并排序
let a=[232,12,46,76,87,3,2,15,34,643,980]
function mergeSort(arr){
    if(arr.length<=1) return arr;
    var mid=Math.floor(arr.length/2);
    var left=arr.slice(0,mid);
    var right=arr.slice(mid);
   return merge(mergeSort(left),mergeSort(right));
}

function merge(left,right) {
    console.log(left,right);
    let re=[];
    while (left.length>0&&right.length>0){
        if(left[0]<right[0]){
            re.push(left.shift())
        }else{
            re.push(right.shift())
        }
    }
    return re.concat(left).concat(right)
}


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for (var i=0;i<nums.length;i++){
        if (nums.indexOf(target-nums.length)!=-1){
            return (i,nums.indexOf(nums.indexOf(target-nums.length)))
        }
    }
};