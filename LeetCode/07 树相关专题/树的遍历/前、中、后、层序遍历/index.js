  /**
          A
       B     C
    D    E       F
   */
 const root = {
    val: "A",
    left: {
      val: "B",
      left: {
        val: "D"
      },
      right: {
        val: "E"
      }
    },
    right: {
      val: "C",
      right: {
        val: "F"
      }
    }
 };
  // 前序遍历
  function preOrderTraverse(root) {
    const res = [];

    const _preOrder = root => {
      if (!root) return;

      res.push(root.val);
      _preOrder(root.left);
      _preOrder(root.right);
    };

    _preOrder(root);
    return res;
  }

  console.log('preOrderTraverse', preOrderTraverse(root)) // A B D E C F

  // 中序遍历
  function inOrderTraverse(root) {
    const res = [];
    const _inOrder = root => {
      if (!root) return;
      _inOrder(root.left);
      res.push(root.val);
      _inOrder(root.right);
    };
    _inOrder(root);
    return res;
  }

  console.log('inOrderTraverse', inOrderTraverse(root)) // D B E A C F

  // 后序遍历
  function postOrderTraverse(root) {
    const res = [];
    const _postOrder = (root) => {
      if (!root) return;
      _postOrder(root.left);
      _postOrder(root.right);
      res.push(root.val);
    }
    _postOrder(root);
    return res;
  }

  console.log('postOrderTraverse', postOrderTraverse(root)) // D E B F C A

  // 层序遍历
  function levelOrderTraverse(root) {
    if (!root) return;
    const res = [];
    const queue = [];
    let level = 0;

    queue.push(root);

    while(queue.length) {
      const len = queue.length;
      res[level] = [];
      for(let i = 0; i <= len - 1; i++) {
        const node = queue.shift();
        res[level].push(node.val);
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
      }
      level++;
    }
    return res;
  }

  console.log('levelOrderTraverse', levelOrderTraverse(root)) // [[A], [B, C], [D, E, F]]