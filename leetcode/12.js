// 大顶堆
let MaxHeap = function() {
  let heap = [,]
  // 堆中元素数量
  this.getSize = ()=>heap.length - 1
  // 插入大顶堆
  this.insert = (key) => {
    heap.push(key)
    // 获取存储位置
    let i = heap.length-1
    while (Math.floor(i/2) > 0 && heap[i] > heap[Math.floor(i/2)]) {
      swap(heap, i, Math.floor(i/2)); // 交换
      i = Math.floor(i/2);
    }
  }
  // 获取堆头
  this.getHead = () => {
    return heap.length > 1 ? heap[1]:null
  }
  // 删除堆头并返回
  this.removeHead = () => {
    if(heap.length > 1) {
      if(heap.length === 2) return heap.pop()
      let num = heap[1]
      heap[1] = heap.pop()
      heapify(1)
      return num
    }
    return null
  }
  // 堆化
  let heapify = (i) => {
    let k = heap.length-1
    // 自上而下式堆化
    while(true) {
      let maxIndex = i
      if(2*i <= k && heap[2*i] > heap[i]) {
        maxIndex = 2*i
      }
      if(2*i+1 <= k && heap[2*i+1] > heap[maxIndex]) {
        maxIndex = 2*i+1
      }
      if(maxIndex !== i) {
        swap(heap, i, maxIndex)
        i = maxIndex
      } else {
        break
      }
    }
  }
  let swap = (arr, i, j) => {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}
let a=[2,7,4,1,8,1];
let heap=new MaxHeap();
a.forEach(v=>{
  heap.insert(v)
})
console.log('这里是 heap 的结果-------------', heap)

