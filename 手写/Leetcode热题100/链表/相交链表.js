/**
 * 160. 相交链表
 *
 *
 * 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 思路:
 *   1. 对链表 A 进行遍历，并通过 MAP 进行存储
 *   2. 对链表 B 进行遍历，判断值是否在 MAP 中，存在则返回该结点
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  const cacheMap = new Map();
  while (headA) {
    cacheMap.set(headA, headA);
    headA = headA.next;
  }

  while (headB) {
    if (cacheMap.has(headB)) {
      return headB;
    }
    headB = headB.next;
  }

  return null;
};
