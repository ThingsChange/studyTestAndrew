/**
 *
 * @author  晴云
 * @create 2020-10-28 11:46
 * @note 干什么的呢？
 **/

function hou(root){
  if (!root) return [];
  let stack=[root];
  let item=null;
  let ans=[];
  while(item=stack.pop()){
          ans.unshift(item.val);
          item.left && stack.push(item.left);
          item.right && stack.push(item.right);
  }
  return ans
}

function zhong(root){
  if (!root) return [];
  let ans=[];
  let stack=[];
  let left=root;
  let item=null;
  while(left){
    stack.push(left)
    left=root.left;
  }
  while(item= stack.pop()){
        ans.push(item.val);
        let temp=item.right;
        while(temp){
          stack.push(temp);
          temp=temp.left;
        }
  }
  return ans
}
