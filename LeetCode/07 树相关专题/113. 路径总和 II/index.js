/**
 * 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
 叶子节点 是指没有子节点的节点。
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 思路: 使用回溯法去获取路径树
 当节点没有左右子树时，判断是叶子节点，通过reduce求出总和是否是targetSum
 如果总和是targetSum, 则存储路径到res中
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
 var pathSum = function(root, targetSum) {
  const res = [];
  const path = [];
  const findPath = (root) => {
      if (!root) {
          return;
      }

      path.push(root.val);
      findPath(root.left);
      findPath(root.right);
      // 如果是叶子节点
      if (!root.left && !root.right) {
          if (!!path.length) {
              const sum = path.reduce((pre, cur) => pre + cur);
              if (sum === targetSum) {
                  res.push(path.slice())
              }
          }
      }
      path.pop();
  }

  findPath(root);

  return res;
};