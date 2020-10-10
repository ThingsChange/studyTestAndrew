/**
 *
 * @author  晴云
 * @create 2020-09-24 15:00
 * @note 干什么的呢？
 **/

function sort(nums,start,end){

  if(start>=end) return ;
  let left=start,right=end
  let mid=left;
  let temp=nums[mid];
  while(left<right){
    while(left<right && nums[right]>temp) right--;
    while(left<right && nums[left]<=temp) left++;
    [nums[left],nums[right]]=[nums[right],nums[left]];
  }
  [nums[left],nums[start]]=[nums[start],nums[left]];
  sort(nums,start,left-1);
  sort(nums,left+1,end)
  return nums
}
let arr= [2,1,4,5,3,5,12,2]
console.log('这里是  的结果-------------', sort(arr,0,arr.length-1),arr)
