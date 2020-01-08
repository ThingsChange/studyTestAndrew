/**
 *
 * @author  晴云
 * @create 2019-08-01 15:55
 * @note 干什么的呢？
 **/
/*给定一个非负整数数组，你最初位于数组的第一个位置。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
判断你是否能够到达最后一个位置。*/
var canJump = function(nums) {
  let length=nums.length;
  let lastPos=length-1;
  for(let i =length-1; i>=0;i--){
    if(nums[i]+i>=lastPos){
      lastPos=i
    }
  }
  return lastPos==0
};

let res=[];
let flag=false;
var canJumbRight=function(nums){
  const result=[];
  let times=[];
  const length=nums.length;
  if(nums.includes(0)&&nums[length-1]!==0) return false
  function canJump(position,nums) {
    if(position===length-1){
      return true
    }

    let nextPoint=Math.min(nums[position]+position,length-1)
    times.push(nextPoint)
    for(let i=position;i<length;i++){
          if(canJump(nextPoint,nums)){
            result.push(times);
            times=[];
            return true
          }
    }
    return false
  }
  return canJump(0,nums)
}

