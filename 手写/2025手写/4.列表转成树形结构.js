/**
 let arr = [
    { id: 1, name: '部门1', pid: 0 }, // pid 表示 父 id
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
    { id: 6, name: '部门6', pid: 0 },
 ]

 思路:
 1. 通过一个 id MAP 存储数组的值，key 是 id
 2. 遍历 MAP，给对应的 pid 值设置 children 属性，该属性指向当前的 id 值
 3. 最终返回 pid = 0 的根节点
 * @param {*} rootList 
 */
function getTreeList(rootList) {
  let tree = {};
  const map = new Map();
  for (const item of rootList) {
    map.set(item.id, item);
  }

  for (const [key, value] of map.entries()) {
    const pid = value.pid;
    const parent = map.get(pid) || {};
    parent.children = parent.children ?? [];
    parent.children.push(value);
    map.set(pid, parent);
  }

  tree = map.get(0);

  return tree;
}

console.log(
  JSON.stringify(
    getTreeList([
      { id: 1, name: "部门1", pid: 0 }, // pid 表示 父 id
      { id: 2, name: "部门2", pid: 1 },
      { id: 3, name: "部门3", pid: 1 },
      { id: 4, name: "部门4", pid: 3 },
      { id: 5, name: "部门5", pid: 4 },
      { id: 6, name: "部门6", pid: 0 },
    ]),
    null,
    2
  )
);
