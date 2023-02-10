import React from 'react'
import ListItem from './ListItem'

function List({ list = [], deleteItem, toggleCompleted }) {
    return <div>
        {list.map(item => <ListItem
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            toggleCompleted={toggleCompleted}
        />)}
    </div>
}

export default List
