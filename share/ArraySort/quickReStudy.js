/**
 *
 * @author  56477
 * @create 2018-07-31 9:02
 * @PROJECT_NAME staff - wlj
 * @note
 * 主要用的是递归的思路，虽然递归效率很低，但是好用啊
 * 递归有三个特点。
 * 1、递归函数必须接受参数。
 * 2、递归函数在定义的起点，应该有一个临界条件（判断条件），当参数满足这个调节时候，函数停止运行，并返回值
 * 3、每次递归函数执行自己的时候，都需要把当前参数做某种修改，然后传入下一次递归。
*        当参数被累积修改到复合临界条件时，递归就结束。
 *        关键词：临界值、跳出口、入口
 **/
var quickSort = function (arr) {
  let length = arr.length
  // 数组长度为1  或者数组长度为0的时候返回当前数组，
  // 记得返回的是数组，这个地方就是跳出递归的地方。
  if (length <= 1) {
    return arr
  }
  let middle = Math.floor(length / 2)
  // 这个地方返回的是截取掉的数组，理论上应该取第一个值，但是数组跟数字比较的时候，数组会转换成数字，先调用 toString
  let midValue = arr.splice(middle, 1)
  let leftArray = [], rightArray = []
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i]
    if (temp > midValue) {
      rightArray.push(temp)
    } else {
      leftArray.push(temp)
    }
  }
  return [].concat(quickSort(leftArray), midValue, quickSort(rightArray))
}
