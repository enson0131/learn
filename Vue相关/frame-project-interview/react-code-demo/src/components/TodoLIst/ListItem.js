import React from 'react'
import CheckBox from './UI/CheckBox'

class ListItem extends React.Component {
    render() {
        const { item } = this.props

        return <div style={{ marginTop: '10px' }}>
            <CheckBox onChange={this.completedChangeHandler}/>
            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.title}
            </span>
            <button onClick={this.deleteHandler}>删除</button>
        </div>
    }
    completedChangeHandler = (checked) => {
        console.log('checked', checked)
        const { item, toggleCompleted } = this.props
        toggleCompleted(item.id)
    }
    deleteHandler = () => {
        const { item, deleteItem } = this.props
        deleteItem(item.id)
    }
}

export default ListItem
