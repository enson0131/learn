function deleteDuplicates(head) {
    let cur = head;
    let pre = null;

    while (cur) {
      if (pre && cur.val === pre.val) {// 删除节点， cur步进，但是pre不需要步进
        pre.next = cur.next;
        cur = cur.next;
      } else { // 步进
        pre = cur;
        cur = cur.next;
      }
    }

    return head;
}