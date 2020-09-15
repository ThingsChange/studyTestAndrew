/**
 *
 * @author  晴云
 * @create 2020-05-21 9:09
 * @note 干什么的呢？
 **/

/*
输入: [1,null,2,3]
1
    \
     2
     /
     3

输出: [1,2,3]*/
// [1,2,3,4,5,6,7] [1,2,4,5,3,6,7]
//前序遍历  顶左右   顶找左 找到没有左子节点，找右，回退；结束；
var preorderTraversal = function(root) {
  if (!root) return [];
  let stack=[root];
  let ret=[];
  let item=null; //当前项
  while(item=stack.pop()){
    ret.push(item.val);
    if(item.right){
      stack.push(item.right)
    }
    if(item.left){
      stack.push(item.left);
    }
  }
  return ret;
}
//中序遍历    顺序：左顶右
// [1,2,3,4,5,6,7]   [4251637]
var inorderTraversal = function(root) {
  if(!root) return [];
  let stack=[root]
  let ret=[];
  let left=root.left;
  let item=null;//当前弹出项；
  while(left){
      stack.push(left)
      left=left.left;
  }
  while(item=stack.pop()){
      ret.push(item.val);
       let t = item.right;
      while(t) {
          stack.push(t);
          t = t.left;
      }
  }
  return ret;
  //后续遍历 輸出顺序 左儿子 右儿子 自己

  var postorderTraversal = function(root) {
    if(!root) return []
    let stack = [root];
    let ret=[] ;
    let p=root;
    while (stack.length){
      let top=stack[stack.length -1]
      if(top.left===p || top.right === p || (!top.left && !top.right)){
        p=stack.pop()
        ret.push(top.val)
      }else{
        if(p.right){
          stack.push(p.right)
        }
        if(p.left){
          stack.push(p.left)
        }
      }
    }
    return ret;
  }












  /*
  if (!root) return [];
  let stack=[root];
  let ret=[];
  let item=null;
  let left=root.left;
  while(left){
    stack.push(left);
    left=left.left;
  }
  while (item=stack.pop()){
    ret.push(item.val)
    let t=item.right;
    while (t){
      stack.push(t)
      t=t.left;
    }
    return ret;
  }*/
}

