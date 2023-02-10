/**
 * 给定一个二叉树的 root ，确定它是否是一个 完全二叉树 。
  在一个 完全二叉树 中，除了最后一个关卡外，所有关卡都是完全被填满的，
  并且最后一个关卡中的所有节点都是尽可能靠左的。它可以包含 1 到 2h 节点之间的最后一级 h 。
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 思路:
 完全二叉树通过层序遍历最后的子节点都是null
 如果出现了null但又出现了真实节点，直接返回false
                    1
              2          3
          4    null null  null
      null null
 * @param {TreeNode} root
 * @return {boolean}
 */

var isCompleteTree = function (root) {
  const queue = [];
  queue.push(root);
  let flag = false; // 设置一个flag位, 判断是否遍历到了null节点
  while(!!queue.length) {
    const node = queue.shift();
    if (node === null) {
      flag = true;
    } else {
      if (flag) return false;
      queue.push(node.left);
      queue.push(node.right);
    }
  }

  return true;
}