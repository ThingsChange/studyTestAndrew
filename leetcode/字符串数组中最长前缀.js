/**
 *
 * @author  晴云
 * @create 2020-07-07 9:10
 * @note 干什么的呢？
 **/

// 输入: ["flower","flow","flight"]
// 输出: "fl"
//
//
// 输入: ["dog","racecar","car"]
// 输出: ""
// 解释: 输入不存在公共前缀。
var longestCommonPrefix = function(strs) {
  if (strs === null || strs.length === 0) return "";
  if(strs.length === 1) return strs[0]
  let min = 0, max = 0
  for(let i = 1; i < strs.length; i++) {
    if(strs[min] > strs[i]) min = i
    if(strs[max] < strs[i]) max = i
  }
  console.log('这里是 min,max 的结果-------------', min,max)
  for(let j = 0; j < strs[min].length; j++) {
    if(strs[min].charAt(j) !== strs[max].charAt(j)) {
      return strs[min].substring(0, j)
    }
  }
  return strs[min]
};
