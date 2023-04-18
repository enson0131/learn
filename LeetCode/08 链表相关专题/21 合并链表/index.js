/**
 真题描述：将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。
 示例： 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4
 */

function mergeTwoLists(list1, list2) {
    let head = new NodeList();
    let cur = head;
    while (list1 && list2) {
      const value1 = list1.val;
      const value2 = list2.val;
      if (value1 >= value2) {
        cur.next = list2;
        list2 = list2.next;
      } else {
        cur.next = list1;
        list1 = list1.next;
      }
      cur = cur.next; // 步近一步
    }

    if (list2) {
      cur.next = list2;
    }

    if (list1) {
      cur.next = list1;
    }

    head = head.next;

    return head;
}



function mergeTwoLists(list1, list2) {
  const head = new ListNode();
  let pre = head;
  let cur1 = list1;
  let cur2 = list2;

  while(cur1 && cur2) {
    const val1 = cur1.val;
    const val2 = cur2.val;

    if (val1 <= val2) {
      pre.next = cur1;
      cur1 = cur1.next;
    } else {
      pre.next = cur2;
      cur2 = cur2.next;
    }

    pre = pre.next;
  }

  // while(cur1) {
  //   pre.next = cur1;
  //   cur1 = cur1.next;
  //   pre = pre.next;
  // }

  // while(cur2) {
  //   pre.next = cur1;
  //   cur1 = cur1.next;
  //   pre = pre.next;
  // }
  if (cur1) {
    pre.next = cur1;
  }

  if (cur2) {
    pre.next = cur2;
  }

  return head.next;
}