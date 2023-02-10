import React from 'react'

class Input extends React.Component {
    render() {
        return <input value={this.props.value} onChange={this.onChange}/>
    }
    onChange = (e) => {
        // 传给父组件
        const newVal = e.target.value
        this.props.onChange(newVal)
    }
}

export default Input
