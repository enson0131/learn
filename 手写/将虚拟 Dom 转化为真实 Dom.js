
/***  
 * 
 * {
    tag: 'DIV',
    attrs:{
        id:'app'
    },
    children: [
      {
        tag: 'SPAN',
        children: [
          { tag: 'A', children: [] }
        ]
      },
      {
        tag: 'SPAN',
        children: [
          { tag: 'A', children: ['1'] },
          { tag: 'A', children: [
            '2',
          ]}
        ]
      }
    ]
  }
  把上诉虚拟Dom转化成下方真实Dom
  <div id="app">
    <span>
      <a></a>
    </span>
    <span>
      <a>1</a>
      <a>12</a>
    </span>
  </div>
 */


  function transformDom(vNode) {
    if (typeof vNode === 'number') vNode = String(vNode);

    if (typeof vNode === 'string') return document.createTextNode(vNode);
    const dom = document.createElement(vNode.tag);
    vNode.attrs && Object.keys(vNode.attrs).forEach(key => {
        dom.setAttribute(key, vNode.attrs[key])
    })

    if (vNode.children && vNode.children.length >= 1) {
        vNode.children.forEach(vNodeItem => {
            dom.append(transformDom(vNodeItem))
        })
    }

    return dom;
  }



  const vNode = {
    tag: 'DIV',
    attrs:{
        id:'app'
    },
    children: [
      {
        tag: 'SPAN',
        children: [
          { tag: 'A', children: [] }
        ]
      },
      {
        tag: 'SPAN',
        children: [
          { tag: 'A', children: ['1'] },
          { tag: 'A', children: [2] }
        ]
      }
    ]
  }

  console.log(transformDom(vNode));
