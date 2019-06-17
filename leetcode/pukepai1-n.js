/**
 *
 * @author  56477
 * @create 2018-09-14 13:29
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 **/
/*
题目：一副从1到n的牌，每次从牌堆顶取一张放桌子上，
再取一张放牌堆底，直到手上没牌，最后桌子上的牌是从1到n有序，
设计程序，输入n，输出牌堆的顺序数组。（题目来源于一篇知乎上的文章）*/


function nixiang(n){
  var  yuan=[];
  var shuchu=[];// 输出1,2,3,4,5,6
  shuchu=new Array(n);
  for(let i=0;i<shuchu.length;i++){
    shuchu[i]=i+1
  }
/*  shuchu.forEach((v,i,a)=>{
    a[i]=i+1
  })*/
  console.log('这里是 shuchu 的结果-------------', shuchu)
  fantui(yuan,shuchu);
}
function fantui(a,b) {
  console.log(a,b);
  a.unshift(b[b.length-1])
  b.pop()
  if(b.length==0){
    return  a;
  }
  //将a的堆底的牌，放到a的堆顶
  var cmp = a[a.length-1];
  a.unshift(cmp)
  a.pop()
  //递归
  console.log('这里是 a,b 的结果-------------', a,b)
  return fantui(a, b);
}
nixiang(5)
