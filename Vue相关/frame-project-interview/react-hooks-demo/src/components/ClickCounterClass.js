import React from 'react'

class ClickCounter extends React.Component {
    constructor() {
        super()

        // 定义 state
        this.state = {
            count: 0,
            name: '双越老师'
        }

        this.clickHandler = this.clickHandler.bind(this)
    }
    render() {
        return <div>
            <p>你点击了 {this.state.count} 次 {this.state.name}</p>
            <button onClick={this.clickHandler}>点击</button>
        </div>
    }
    clickHandler() {
        // 修改 state
        this.setState({
            count: this.state.count + 1,
            name: this.state.name + '2020'
        })
    }
}

export default ClickCounter
