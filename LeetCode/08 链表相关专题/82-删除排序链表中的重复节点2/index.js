/*
     * 思路:
     * 对链表的删除操作需要找到先驱节点和目标节点
     * 因为重复的节点会全部被删除，因此需要创建一个dummy节点
     *
     * 节点的删除一般操作:
     *     A. 先驱节点的next指向删除节点的next
     *
     * 节点的移动一般操作:
     *     A. 前驱节点赋值目标节点
     *     B. 目标节点赋值下一个节点
     */
function deleteSortDummyNode(head) {
    if (!head || !head.next) return head;

    let dummy = new ListNode();
    dummy.next = head;
    let pre = dummy;
    let cur = head;

    while (cur && cur.next) {
      if (cur.val === cur.next.val) { // 删除节点， cur步进，但是pre不需要步进
        while (cur && cur.next && cur.val === cur.next.val) {
          // cur && cur.next是因为防止cur.next为空的场景
          cur = cur.next;
        }
        cur = cur.next;
        pre.next = cur;
      } else {
        // 正常场景
        pre = cur; // 移动操作
        cur = cur.next; // 移动操作
      }
    }
    return dummy.next;
}