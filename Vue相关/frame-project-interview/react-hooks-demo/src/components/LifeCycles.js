import React, { useState, useEffect } from 'react'

function LifeCycles() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('双越老师')

    // // 模拟 class 组件的 DidMount 和 DidUpdate
    // useEffect(() => {
    //     console.log('在此发送一个 ajax 请求')
    // })

    // // 模拟 class 组件的 DidMount
    // useEffect(() => {
    //     console.log('加载完了')
    // }, []) // 第二个参数是 [] （不依赖于任何 state）

    // // 模拟 class 组件的 DidUpdate
    // useEffect(() => {
    //     console.log('更新了')
    // }, [count, name]) // 第二个参数就是依赖的 state

    // 模拟 class 组件的 DidMount
    useEffect(() => {
        let timerId = window.setInterval(() => {
            console.log(Date.now())
        }, 1000)

        // 返回一个函数
        // 模拟 WillUnMount
        return () => {
            window.clearInterval(timerId)
        }
    }, [])

    function clickHandler() {
        setCount(count + 1)
        setName(name + '2020')
    }

    return <div>
        <p>你点击了 {count} 次 {name}</p>
        <button onClick={clickHandler}>点击</button>
    </div>
}

export default LifeCycles
