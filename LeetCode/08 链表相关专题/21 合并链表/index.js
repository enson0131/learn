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