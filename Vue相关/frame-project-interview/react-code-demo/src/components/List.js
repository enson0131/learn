import React from 'react'

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'React',
            list: ['a', 'b', 'c']
        }
    }
    render() {
        return <div>
            <p onClick={this.changeName.bind(this)}>{this.state.name}</p>
            <ul>{
                this.state.list.map((item, index) => {
                    return <li key={index}>{item}</li>
                })
            }</ul>
            <button onClick={this.addItem.bind(this)}>添加一项</button>
        </div>
    }
    changeName() {
        this.setState({
            name: '双越'
        })
    }
    addItem() {
        this.setState({
            list: this.state.list.concat(`${Date.now()}`) // 使用不可变值
        })
    }
}

export default List