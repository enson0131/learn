/**
 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
  
 百度百科中最近公共祖先的定义为：
 “对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。

 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
 输出: 6 
 解释: 节点 2 和节点 8 的最近公共祖先是 6。

 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 思路:
 * 1 先保证p < q
 * 2 对树进行遍历, 当 value < p 取root.right 往右遍历
 * 3 当 value > q 往左遍历
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if (p.val > q.val) {
    [p, q] = [q, p];
  }

  const _searchRoot = (root) => {
    const value = root.val;
    const leftValue = p.val;
    const rightValue = q.val;
    if (value >= leftValue && value <= rightValue) return root;

    if (value < leftValue) return _searchRoot(root.right);

    if (value > rightValue) return _searchRoot(root.left);
  }

  return _searchRoot(root);
};


/**
 思路: 
 1 如果搜索的俩个节点都小于根节点，那么递归左子树
 2 如果搜素的节点都大于根节点，那么递归右子树
 3 如果是一大一小，那么当前的根节点就是最近公共祖先
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 const lowestCommonAncestor = (root, p, q) => {
  if (p.val < root.val && q.val < root.val) {
      return lowestCommonAncestor(root.left, p, q);
  }
  if (p.val > root.val && q.val > root.val) {
      return lowestCommonAncestor(root.right, p, q);
  }
  return root;
};