import React from 'react'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    render() {
        return <div>
            <span>{this.state.count}</span>
            <button onClick={this.onIncrease}>increase</button>
        </div>
    }
    onIncrease = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    // 演示 shouldComponentUpdate 的基本使用
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.count !== this.state.count) {
            return true // 可以渲染
        }
        return false // 不重复渲染
    }
}

export default App
