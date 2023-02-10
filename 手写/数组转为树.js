// a, b, c, d, e, f
/**
 *       a
 *    b     c
 * d  e  f
 */
const g_arr = [
  {
    id: 1,
    parentId: 0,
    name: 'a',
  },
  {
    id: 2,
    parentId: 1,
    name: 'b',
  },
  {
    id: 3,
    parentId: 2,
    name: 'd',
  },
  {
    id: 4,
    parentId: 2,
    name: 'e',
  },
  {
    id: 5,
    parentId: 2,
    name: 'f',
  },
  {
    id: 6,
    parentId: 1,
    name: 'c',
  },
]


/**
 * 思路:
 * 1 维护一个Map, key为id, value为对应的子节点
 * 2 遍历arr
 * 3 父元素通过children建立与子元素的联系
 * 4 如果是根元素赋值给根元素即可
 * @param {*} arr 
 */
function convert(arr) {
    let res = [];
    const hashMap = new Map();

    for(let item of arr) {
        hashMap.set(item.id, item);
    }

    for(let item of arr) {
        const parentId = item.parentId;
        if (parentId === 0) { // 根节点
            res.push(item)
        } else { // 子节点
            const parentNode = hashMap.get(parentId);
            parentNode.children = parentNode.children ? parentNode.children : [];
            parentNode.children.push(item)
        }
    }

    return res[0]
}



// 广度遍历
var borderEach = (root) => {
  const queue = [];

  queue.push(root);

  while(queue.length) {
    const currentNode = queue.shift();

    console.log(currentNode.name);

    if (currentNode.children) {
      for(let children of currentNode.children) {
        queue.push(children);
      }
    }
  }
}

function arr2tree(arr) {
    const res = [];
    const map = new Map();
  
    arr.forEach(item => {
      map.set(item.id, item);
    });
  
    for (let value of arr) {
      if (value.parentId === 0) {
        // 父元素
        res.push(value);
      } else {
        const parentNode = map.get(value.parentId);
        parentNode.children = parentNode.children || [];
        parentNode.children.push(value);
      }
    }
  
    return res[0];
}

  
borderEach(convert(g_arr))



























// ------------------------------------------------------------
/**
 * 思路
 * 1 获取到根节点
 * 2 查找子节点对应的parentId与根节点对应，则作为根节点的children元素
 * 3 依次递归
 * @param {*} arr 
 */
// function listToTree (arr) {
//   const root = (arr.sort((a, b) => a.parentId < b.parentId))[0]; // 获取根元素

//   const _transformTree = (root) => {
//     for(let item of arr) {
//       if (root.id === item.parentId) {
//         const children = root.children || [];
//         children.push(item);
//         root.children = children;
//       }
//     }

//     root.children && root.children.forEach(children => {
//       _transformTree(children)
//     })
//   }
//   _transformTree(root);

//   return root;
// }

// const tree = listToTree(g_arr);


