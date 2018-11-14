/**
 *  created by qingyun
 *  time: 2018/8/1  0:18
 *  note : 动态规划 （Dynamic Programming,DP）是一种将复杂问题分解成更小的子问题来解决的优化技术
 *  动态规划和分而治之（快排、归并算法中用到的）是不同的方法
 *  分而治之  是把问题分解成相互独立的子问题，然后组合他们的答案
 *  动态规划 是将问题分解成相互依赖的子问题。
 *  用动态规划解决问题，要遵循三个重要的步骤：
 *  1、定义子问题；
 *  2、实现要反复执行而解决子问题的部分（参考递归的步骤）
 *  3、识别并求解出边界条件
 */
/*
* 经典例子：硬币找零，背包问题  ，最长公共子序列，矩阵连相乘
* e.g. 硬币找零的变种：最少硬币找零问题
* */
/*
* 硬币找零：给你找零的钱数，以及可哟经的硬币面额d1,d2,d.....dn，找出有多少个找零方法
* 最少硬币找零的问题，是给你找零的钱数，以及可哟经的硬币面额d1,d2,d.....dn，找出有多少个找零方法  找到所需的最少硬币个数
* */
/*
* e.g.  美国有硬币 d1=1,d2=5,d3=10,d4=25
* 如果要找零36美分，请问至少需要几个硬币，用算法解出
* */
/*var coins=[1,5,10,25]
var dol=35
function MinCoinChange(coins){
  var coins=coins;
  var cache=[];
  this.makeChange=function (amount) {
    var me =this;
    if(!amount){
      return [];
    }
    if(cache[amount]){
      return cache[amount]
    }
    var min =[],newMin,newAmount;
    for (var i=0;i<coins.length;i++){
      var coin=coins[i];
       newAmount=amount-coin
      if(newAmount>=0){
         newMin=me.makeChange(newAmount);
      }
      if(newAmount>=0&&
        (newMin.length<min.length-1||!min.length)
        &&(newMin.length||!newAmount)
      ){
         min=[coin].concat(newMin)
        console.log('new Min '+min+' for '+amount)
      }
    }
    return (cache[amount]=min)
  }
}

var minCoinChange=new MinCoinChange(coins)
minCoinChange.makeChange(36)*/


var coins=[1,5,10,25]
var dol=35
function MinCoinChangeNew(coins){
  var cache=[];
  let me=this;
  this.makeChange=function (amount) {
    if(!amount ){
      return [];
    }
    if(cache[amount]){
      return  cache[amount]
    }
    let min =[],newMin,newAmount
    for (let i =0;i<coins.length;i++){
      let coin=coins[i]
        newAmount=amount-coin;
      if(newAmount>=0){
        newMin=me.makeChange(newAmount);
      }
      if((newMin.length<min.length-1||!min.length)&&(!newAmount||newMin.length)&&newAmount>=0){
        min=[coin].concat(newMin)
        console.log('new Min '+min+' for '+amount)
      }
    }
    return (cache[amount]=min)
  }
}
var minCoinChange=new MinCoinChangeNew(coins)
minCoinChange.makeChange(dol)
