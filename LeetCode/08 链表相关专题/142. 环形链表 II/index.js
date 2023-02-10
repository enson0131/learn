/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */



/**
 * 思路:
 * 1 建立一个map对每一个链表的节点进行缓存
 * 2 获取当前节点的下一个节点，如果有缓存过，则说明是环形链表。返回节点
 * 3 如果遍历到最后没有发现有缓存节点，则不会环形链表，直接返回null
 * @param {ListNode} head
 * @return {ListNode}
 */
 var detectCycle = function(head) {
  const map = new Map();
  let currentNode = head;
  while(currentNode) {
    map.set(currentNode, currentNode);

    currentNode = currentNode.next;

    if (map.has(currentNode)) {
      return map.get(currentNode)
    }
   
  }

  return null;
};