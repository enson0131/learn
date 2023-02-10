/**
 * 从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 思路: 二叉树的层序遍历并通过一个变量level去控制层级
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
    
  if (!root) return [];

  const res = [];
  const queue = [];
  let level = 0;
  queue.push(root);

  while(!!queue.length) {
      const len = queue.length;
      res[level] = res[level] || [];
      for(let i = 0; i < len; i++) {
          const node = queue.shift();
          res[level].push(node.val);

          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
      }
      level++;
  }

  return res;
};