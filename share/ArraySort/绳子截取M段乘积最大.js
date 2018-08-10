/**
 *
 * @author  56477
 * @create 2018-08-06 8:38
 * @PROJECT_NAME staff - wlj
 * @note 剪绳子问题
                 给你一根长度为N的绳子，请把绳子剪成M段（m,n都是整数），每段绳子的
                 长度记为k[0],k[1],k[2]…. 请问如何剪绳子使得k[0],k[1],k[2]
                 的乘积最大
                 例如 绳子长度8 最大乘积18 = 2*3*3
 **/

function cutCord(n,) {
  if (n < 2) {
    return 0;
  }
  if (n === 2) {
    return 1 * 1;
  }
  if (n === 3) {
    return 2;//2*1>1*1*1
  }
//这里面存储着n米绳子的最佳使用长度  n[x];
  var res = new Array(n + 1)
  res[0] = 0;
  res[1] = 1;
  res[2] = 2;
  res[3] = 3;

  for (var i = 4; i <= n; i++) {
    var max = 0;
    for (let j = 1; j <= i / 2; j++) {
      var r = res[j] * res[i - j];
      if (max < r) {
        max = r;
        res[i] = max;
      }
    }
  }
  max = res[n];
  return max;
}












  //长度大于4的时候
  //2*2>3*1
  //剪绳子嘛，肯定得先下去一刀，别想那么多，你先剪一次
  // 假如说你第一刀下去 第一段长度是 i,那么剩下就需要剪 n-i
  //那么 f(n)=max{f(i)*f(n-i)}.而f(n)的最优解对应着f(i)和f(n-i)的最优解
  // 假如f(i)不是最优解，那么其最优解和f(n-i)乘积肯定大于f(n)的最优解，和f(n)达到最优解矛盾，所以f(n)的最优解对应着f(i)和f(n-i)的最优解。
  //首先，剪绳子是最优解问题，其次，大问题包含小问题，并且大问题的最优解包含着小问题的最优解，所以可以使用动态规划求解问题，
  // 并且从小到大求解，把小问题的最优解记录在数组中，求大问题最优解时就可以直接获取，避免重复计算。
  //一直分解，，会发现到绳子最短的时候，如果分解到4这一步，你会发现存在2*2>1*3,分解到5是  2*3>2*2*1=1*4
  // 所以当一段绳子到了长度为3的时候，我们就不要再去截取他了，因为他的最佳利用长度就是3
  //cache中存储着最佳利用长度
  //伪代码
  /*f(4)=max{f(1)f(3), f(2)f(2)}
  f(5)=max{f(1)f(4), f(2)f(3)}
  f(6)=max{f(1)f(5),f(2)*f(4),f(3)*f(3)}
  f(7)=max{f(1)*f(6),f(2)*f(5),f(3)*f(4)}
   ...
  f(n)=max{f(1)f(n-1), f(2)f(n-2), f(3)f(n-3), ..., f(i)(fn-i), ...}*/
  //是否可以得出结论了呢
/*  var cache={};
  cache[1]=1;
  cache[2]=2;
  cache[3]=3;
  // cache[4]=2*2>1*3;
  // cache[5]=2*3;
  let  me=this;
  this.getMax=function (ll,lr) {
    /!*if(cache[ll]&&cache[lr]){
      return cache[ll]*cache[lr]
    }
    if(cache[ll]&&!cache[lr]){
      return cache[ll]*me.getMax(x,lr-x)
    }
    if(cache[lr]&&!cache[ll]){
      return cache[lr]*me.getMax(x,ll-x)
    }*!/
    if(lr>=3){//说明还没达到绳子的最佳利用长度，继续剪；
      return me.getMax(3,lr-3)
    }
    if(lr=2){//不能再分割了。
      return me.getMax(3,2)
    }
    if(lr=1){//说明分了好多个3，但是呢，余数为1，这时候，将最后一次分隔的3根这个1合并起来，然后分成2*2即可，因为2*2>1*3

    }
    if(ll){

    }
    var newL=n-i;
    var a=cache[i];
    var b=cache[n-i];
     if(a){

     }
  }*/
// }
