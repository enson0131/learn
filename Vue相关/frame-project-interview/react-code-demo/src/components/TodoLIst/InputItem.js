import React from 'react'
import Input from './UI/Input'

class InputItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }
    render() {
        return <div>
            <Input value={this.state.title} onChange={this.changeHandler}/>
            <button onClick={this.clickHandler}>新增</button>
        </div>
    }
    changeHandler = (newTitle) => {
        this.setState({
            title: newTitle
        })
    }
    clickHandler = () => {
        const { addItem } = this.props
        addItem(this.state.title)

        this.setState({
            title: ''
        })
    }
}

export default InputItem
