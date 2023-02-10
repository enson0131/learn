const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
      // 设置显示类型（所有、完成、未完成）
      case 'SET_VISIBILITY_FILTER':
        return action.filter

      // 默认是 SHOW_ALL
      default:
        return state
    }
  }
  
  export default visibilityFilter