/**
 *
 * @author  56477
 * @create 2018-07-31 10:15
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 * 　归并排序（MERGE-SORT）是利用归并的思想实现的排序方法，
 *      该算法采用经典的分治（divide-and-conquer）策略
 * （分治法将问题分(divide)成一些小的问题然后递归求解，
 *     而治(conquer)的阶段则将分的阶段得到的各答案"修补"在一起，即分而治之)。
 **/

var oArray = [8, 4, 5, 7, 1, 3, 6, 2]
// 采用自上而下的递归方法
var mergeSort = function(arr) {
  // 跳出递归的地方
  if (arr.length <= 1) {
    return arr
  }
  let mid = Math.floor(arr.length / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  // 其实下面这个函数是属于尾递归优化的。
  return merge(mergeSort(left), mergeSort(right))
}
var merge = function (left, right) {
  let result = []
  while (left.length > 0 && right.length > 0) {
    if (left[0] > right[0]) {
      result.push(right.shift())
    } else {
      result.push(left.shift())
    }
  }
  return result.concat(left).concat(right)
}
mergeSort(oArray)
