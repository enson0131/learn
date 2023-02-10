const root = {
  "id":1,
  "parentId":0,
  "name":"a",
  "children":[
    {
      "id":2,
      "parentId":1,
      "name":"b",
      "children":[
        {"id":3,"parentId":2,"name":"d"},
        {"id":4,"parentId":2,"name":"e"},
        {"id":5,"parentId":2,"name":"f"}
      ]
    },
    {"id":6,"parentId":1,"name":"c"}
  ]
}
/**
 * 前序遍历/中序遍历/后序遍历/层序遍历
        a
      b   c
    d e f
 */
const borderEach = (root) => {
  const queue = [];

  queue.push(root);

  while(queue.length) {
    const currentNode = queue.shift();

    console.log(currentNode.name);

    if (currentNode.children) {
      currentNode.children.forEach(element => {
        queue.push(element);
      });
    }
  }
}

// borderEach(root)


function transformArr(root) {
    const arr = [];
    const queue = [];
    queue.push(root);
  
    while (queue.length) {
      const currentNode = queue.shift();
      arr.push(currentNode.name);
  
      if (currentNode.children) {
        currentNode.children.forEach(item => {
          queue.push(item);
        });
      }
    }
  
    return arr;
}
  
console.log(transformArr(root));

