/**
 * 请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，
 * 第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 思路:
 1 按广度优先对树进行遍历
 2 用level表示层数，
   单数push从左到右
   双数unshift从右到左
 * @param {TreeNode} root
 * @return {number[][]}
 */
   var levelOrder = function(root) {
    const res = [];
    const queue = [];
    let level = 0;
  
    if (!root) return res;
    
    queue.push(root);
  
    while(queue.length) {
      const len = queue.length - 1;
      res[level] = [];
      const isLeft = (level + 1) % 2 !== 0; // 当前level是否是从左到右
      for(let i = 0; i <= len; i++) {
        const node = queue.shift();
        isLeft ? res[level].push(node.val) : res[level].unshift(node.val);
    
        if(node.left) queue.push(node.left)
        if(node.right) queue.push(node.right)
       
      }
  
      level++;
    }
     
    return res;
  };