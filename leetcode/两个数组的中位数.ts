/*给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 nums1 和 nums2 不会同时为空。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/median-of-two-sorted-arrays
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

示例 1:

nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0
示例 2:

nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/median-of-two-sorted-arrays
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let nums = nums1.concat(nums2).reverse((a, b) => a - b);
  let len = nums.length;
  let mid = len / 2;
  let mod = len % 2
  if (mod) {
    return nums[len]
  } else {
    return (nums[len - 1] + nums[len + 1]) / 2
  }
};


// [1,2],[3,4]   [1,2,3] ,[45]
function f1(arr1, arr2) {
  if (arr1.length > arr2.length) {
    [arr1, arr2] = [arr2, arr1]
  }
  const arr1Length = arr1.length, arr2Length = arr2.length;
  let iMin = 0, iMax = arr1Length;
  const halfLen = Math.floor((arr1Length + arr2Length + 1) / 2);   // +1 这种情况单数时取maxleft
  while (iMin <= iMax) {
    let i = Math.floor((iMin + iMax) / 2);   //   二分查找
    let j = halfLen - i;
    if (i < iMax && arr2[j - 1] > arr1[i]) {
      iMin = i + 1;
    } else if (i > iMin && arr1[i - 1] > arr2[j]) {
      iMax = i - 1;
    } else {
      let maxLeft = 0;
      if (i === 0) {
        maxLeft = arr2[j - 1]
      } else if (j === 0) {
        maxLeft = arr1[i - 1]
      } else {
        maxLeft = Math.max(arr1[i - 1], arr2[j - 1]);
      }
      if ((arr1Length + arr2Length) % 2 === 1) {
        return maxLeft;
      }

      let minRight = 0;
      if (i === arr1Length) {
        minRight = arr2[j];
      } else if (j === arr2Length) {
        minRight = arr1[i];
      } else {
        minRight = Math.min(arr2[j], arr1[i]);
      }
      return (maxLeft + minRight) / 2
    }
  }
  return 0;
}


/*输入: 5
输出:
  [
    [1],
    [1,1],
    [1,2,1],
    [1,3,3,1],
    [1,4,6,4,1]
  ]*/
1
12
23
34
1
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  let res = [];
/*  res = Array.from(new Array(numRows), (v, i) => {
    return new Array(i + 1).fill(1)
  })
  for (let i = 2; i < numRows; i++) {
    for (let j = 1; j < i; j++) {
      res[i][j] = res[i - 1][j - 1] + res[i - 1][j]
    }
  }*/
let i=0,j=0;
  for(;i<numRows;i++){
    let temp=[];
    for( j=0;j<=i;j++){
      if(j>0&&j<i){
        let last=res[i-1];
        temp[j]=last[j-1]+last[j]
      }else{
        temp[j]=1
      }
    }
    res.push(temp)
  }
  return res
};


/*
给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。
* 输入: 3
输出: [1,3,3,1]
空间复杂度O（k）
*
* */
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
  let res=[];
  let index=1;
  for(let i=0;i<rowIndex;i++){
    res.push(index)
    index=index*((rowIndex-i)/(i+1))
  }
return res
};
