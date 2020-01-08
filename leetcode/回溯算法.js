/**
 *
 * @author  晴云
 * @create 2019-08-02 11:04
 * @note 回溯算法
 **/
 /*八皇后的问题*/
let res=0;
let qipan=Array.from(new Array(8),v=>new Array(8).fill(0))
// console.log('这里是 qipan 的结果-------------', qipan)
function findQueen( row=0){
  if(row>7){
    res++;
    print();
    return false;
  }
  for(let column=0;column<8;column++){
    if(check(row,column)){
      qipan[row][column]=1
      findQueen(row+1);
      qipan[row][column]=0
    }
  }
}
function print() {
  console.log('这里是方案 res 的结果-------------', res)
  console.table(qipan)
  /*qipan.map(row=>{
    row.map(column=>{
      if(column){
        console.log(' o')
      }else{
        console.log('+ ')
      }
    })
    console.log('    ' )
  })*/
}
function check(row,column){
//  行 列
  for(let i=0;i<row;i++){
    if(qipan[i][column]){
      return false
    }
  }
  //左对角线
  for(let i=row-1,m=column-1;i>=0&&m>=0;i--,m--){
    if(qipan[i][m]){
      return false;
    }
  }
//  右对角线
  for(let i=row-1,j=column+1;i>=0&&j<=7;i--,j++){
    if(qipan[i][j]){
      return false
    }
  }
  return true
}
findQueen();
