const applyMixin = (Vue) => {
  Vue.mixin({ // 插件的混合一般在 beforeCreate 方法
    beforeCreate: vuexInit, // 所有组件都共有了根实例的store
  })
}

/*
new Vue({
  router,
  store: storeInstance, // 可以在根实例上获取到store属性
  render: h => h(App),
}).$mount('#app');
*/
function vuexInit () {
  // vue-router 是把属性定义到根实例上，所有组件都能拿到这个根，通过根实例去获取属性
  // vuex 给每个组件都定义一个$store属性，指向根实例的store属性
  const options = this.$options;
  
  if (options.store) {
    // 根实例
    this.$store = options.store;
  } else if (options.parent && options.parent.$store){
    // 子组件
    this.$store = options.parent.$store;
  }
}


export default applyMixin;