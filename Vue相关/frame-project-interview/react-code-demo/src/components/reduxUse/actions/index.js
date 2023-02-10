let nextTodoId = 0

// 创建一个 todo
export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

// 设置完成状态
export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

// 切换 todo 完成状态
export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}