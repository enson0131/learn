const todos = (state = [], action) => {
    switch (action.type) {
      // 创建一个 todo
      case 'ADD_TODO':
        // 注意，返回不可变数据
        return [
          ...state,
          {
            id: action.id,
            text: action.text, // title
            completed: false
          }
        ]
      
      // 切换一个 todo 的完成状态
      case 'TOGGLE_TODO':
        // 注意，返回不可变数据
        return state.map(todo =>
          (todo.id === action.id) 
            ? {...todo, completed: !todo.completed} // 切换完成状态
            : todo
        )
      default:
        return state
    }
  }
  
  export default todos