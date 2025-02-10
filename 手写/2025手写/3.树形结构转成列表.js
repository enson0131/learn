/**
 将 data 转化为 列表
 const data = [
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id: 2,
                text: '节点1_1',
                parentId: 1
            }
        ]
    }
  ]
  思路:
  1. 创建一个数组
  2. 通过深度优先算法，遍历树
  3. 将值存储到数组中
 * @param {*} tree 
 */

const treeToList = (tree) => {
  const res = [];

  const _dfs = (tree) => {
    if (!tree) return;
    for (const treeItem of tree) {
      res.push(treeItem);

      if (treeItem.children) {
        _dfs(treeItem.children);
        delete treeItem.children;
      }
    }
  };

  _dfs(tree);

  return res;
};

console.log(
  `treeToList`,
  treeToList([
    {
      id: 1,
      text: "节点1",
      parentId: 0,
      children: [
        {
          id: 2,
          text: "节点1_1",
          parentId: 1,
        },
      ],
    },
  ])
);
