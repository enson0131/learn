/**
 由于此处是已排序的链表
 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
 */
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



function deleteDuplicates(head) {
    let cur  = head;

    while(cur && cur.next) {
      if (cur.val === cur.next.val) {
        cur.next = cur.next.next;
      }

      cur  = cur.next;
    }

    return head;
}