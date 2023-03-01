import React from 'react';


function HOC (Component) {
    const proDidMount = Component.prototype.componentDidMount;
    Component.prototype.componentDidMount = function () {
        console.log(`渲染劫持-生命周期 componentDidMount`);
        proDidMount.call(this);
    }
    return class WrapComponent extends React.Component {
        render() {
            return <Component {...this.props} />
        }
    }
}


class Index extends React.Component {
    componentDidMount() {
        console.log(`源组件的componentDidMount`);
    }
    render(){
        return <div>hello,world</div>
    }
}

export default HOC(Index);