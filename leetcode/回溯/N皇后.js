/**
 *
 * @author  晴云
 * @create 2020-06-11 9:39
 * @note 干什么的呢？
 **/
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  if(!n) return [];
  if(n<=1) return [Q]
  let res = [];
  //board 中小于row的那些行已经成功放置了皇后
  let backTrace=function(board,row){
    // 结束条件
    console.log('这里是 board.lengthm,row 的结果-------------', board.length,row)
    if(board.length===(row)){
      console.log(JSON.parse(JSON.stringify(board)),'000000000000')
      res.push(JSON.parse(JSON.stringify(board)));
      return
    }
      let n=board[row].length;
      for(let col=0;col<n;col++){
        if(!isValidate(board,row,col)) continue
        // 做选择
        board[row][col]='Q'
        console.log(JSON.parse(JSON.stringify(board)),'11111111111111111111');
        // 进行下一次决策
        backTrace(board,row+1)
        // 撤销选择
        board[row][col]='.'
      }
  }
  function isValidate(board,row,col){
    let flag=true;
    let n=board.length
    // 同列有没有
    for(let i=0;i<n;i++){
      if(board[i][col]==='Q'){
        flag=false;
        return
      }
    }
    // 检查右上方是否有冲突
    for(let i=row-1,j=col+1;i>=0&&j<n;i--,j++){
      if(board[i][j]==='Q'){
        flag=false;
        return
      }
    }
    // 检查左上方是否有冲突
    for(let i=row-1,j=col-1;i>=0&&j>=0;i--,j--){
      if(board[i][j]==='Q'){
        flag=false;
        return
      }
    }
    return flag
  }
  function init(n){
    let ares=Array.from(Array(n),(item)=>Array(n).fill('.'))
    backTrace(ares,0)
    console.log('最终的结果是',res)
  }
  init(n);
  return res;
};
solveNQueens(4)
