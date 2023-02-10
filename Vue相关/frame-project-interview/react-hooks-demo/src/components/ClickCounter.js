import React, { useState } from 'react'

function ClickCounter() {
    // 数组的解构
    // useState 就是一个 Hook “钩”，最基本的一个 Hook
    const [count, setCount] = useState(0) // 传入一个初始值

    const [name, setName] = useState('双越老师')

    // const arr = useState(0)
    // const count = arr[0]
    // const setCount = arr[1]

    function clickHandler() {
        setCount(count + 1)
        setName(name + '2020')
    }

    return <div>
        <p>你点击了 {count} 次 {name}</p>
        <button onClick={clickHandler}>点击</button>
    </div>
}

export default ClickCounter
