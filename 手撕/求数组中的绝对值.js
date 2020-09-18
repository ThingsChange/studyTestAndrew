/**
 *
 * @author  晴云
 * @create 2020-09-17 21:20
 * @note 干什么的呢？
 **/

function fn(nums,n){
  let ans = new Set(), len = nums.length
  if(!len) return ans
  let map = new Map();
  for(let num of nums){
    if(map.has(n-num)){
      if(map.get(n-num)===''){
        ans.add([num,n-num])
        map.set(n-num,num)
      }
    }else{
      map.set(num,'')
    }
  }
  return ans
}

console.log(fn([1, 2, 3,4 ,5, -1, -2, -3, 0, -1, 0 , 0 ,0 ],0))
