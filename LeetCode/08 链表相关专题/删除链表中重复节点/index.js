function deleteNode(node) {
    const map = new Map();
    let cur = node;
    let pre = null;
    while (cur) {
      if (map.has(cur.val)) {
        // 删除节点
        pre.next = cur.next;
        cur = cur.next;
      } else { // 移步操作
        map.set(cur.val, cur);
        pre = cur;
        cur = cur.next;
      }
    }

    return node;
}