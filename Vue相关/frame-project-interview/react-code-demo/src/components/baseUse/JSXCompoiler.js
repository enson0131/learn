// https://www.babeljs.cn/

// // JSX 基本用法
// const imgElem = <div id="div1">
//     <p>some text</p>
//     <img src={imgUrl}/>
// </div>

// // JSX style
// const styleData = { fontSize: '30px',  color: 'blue' }
// const styleElem = <p style={styleData}>设置 style</p>

// // JSX 加载组件
// const app = <div>
//     <Input submitTitle={onSubmitTitle}/>
//     <List list={list}/>
// </div>

// // JSX 事件
// const eventList = <p onClick={this.clickHandler}>
//     some text
// </p>

// // JSX list
// const listElem = <ul>{this.state.list.map((item, index) => {
//     return <li key={item.id}>index {index}; title {item.title}</li>
// })}</ul>


// // 总结
// React.createElement('div', null, [child1, child2, child3])
// React.createElement('div', {...}, child1, child2, child3)
// React.createElement(List, null, child1, child2, '文本节点')
// // h 函数
// // 返回 vnode
// // patch