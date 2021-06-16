/**
 *
 * @author  晴云
 * @create 2020-06-05 9:30
 * @note 干什么的呢？
 **/

// 输入:
//
//   1
//   /   \
// 2     3
//  \
//   5
//
// 输出: ["1->2->5", "1->3"]
//
// 解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
//
// 链接：https://leetcode-cn.com/problems/binary-tree-paths
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  if(!root) return [];
   let ret=[];
      let dfs=function (node,temp) {
        temp.push(node.val)
        if(!node.left && !node.right){
          ret.push(temp.join('->'));
        }
        node.left&&dfs(node.left,[...temp])
        node.right&&dfs(node.right,[...temp])
      }
      dfs(root,[])
      return ret
    };

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string}
 */
var smallestFromLeaf = function(root) {
//层级便利，找到每层最小的，转成字母，并记录，然后找到对应的父节点，再找到最小的。
//  后续遍历

  // if (root == nullptr) return 0;
  // int left = max(0, oneSideMax(root->left));
  // int right = max(0, oneSideMax(root->right));
  // ans = max(ans, left + right + root->val);
  // return max(left, right) + root->val;

  if(!root) return '';
};
