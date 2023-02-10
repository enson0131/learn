import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

// 函数组件，接收 props 参数
let AddTodo = ({ dispatch }) => {
  // dispatch 即 props.dispatch

  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          // 创建一个 todo
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

// connect 高阶组件 ，将 dispatch 作为 props 注入到 AddTodo 组件中
AddTodo = connect()(AddTodo)

export default AddTodo