import React from 'react';

const toLearn = [ 'react' , 'vue' , 'webpack' , 'nodejs'  ]

const TextComponent = ()=> <div> hello , i am function component </div> 

class Index extends React.Component{
    status = false; // 状态
    renderFoot = () => <div>i am foot</div>
    // 控制渲染
    controlRender = () => {
        const reactElement = (
            <div style={{marginTop: '100px'}} className="container">
                {/* element 元素类型 */}
                <div>hello,world</div>
                {/** fragment 类型 */}
                <React.Fragment>
                    <div> 👽👽 </div>
                </React.Fragment>
                {/** text 文本类型 */}
                my name is enson
                {/** 数组节点类型 */}
                { toLearn.map(item => <div key={item}>let us learn {item}</div>)}
                {/** 组件类型 */}
                <TextComponent />
                {/** 三元运算符 */}
                { this.status ? <TextComponent /> : <div>三元运算符</div>}
                { /** 函数执行 */}
                { this.renderFoot()}  
                <button onClick={() => console.log(this.render())}>打印 render 后的内容</button>
            </div>
        )
        console.log(reactElement);

        const { children } = reactElement.props;
        /** 第1步: 扁平化 children */
        const flatChildren = React.Children.toArray(children);
        console.log(flatChildren);

        /** 第2步: 去除文本节点 */
        const newChildren:any = [];
        React.Children.forEach(flatChildren, (item) => {
            if (React.isValidElement(item)) {
                newChildren.push(item);
            }
        })

        /** 第3步: 插入新的节点 */
        const lastChildren = React.createElement('div', {className: 'last'}, 'say goodbye');
        newChildren.push(lastChildren);

        /** 第4步: 修改容器节点 */
        const newReactElement = React.cloneElement(reactElement, {}, ...newChildren);
        return newReactElement;
    }
    render() {
        return this.controlRender();
    }
}

export default Index;