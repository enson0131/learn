// 主文件的作用一般就是整合操作

import { Store, install } from './store';
import { mapState, mapGetters, mapActions, mapMutations } from './helpers';



// 俩种方式都可以，可以采用默认导入，也可以采用解构
// import vuex from 'vuex';
export default {
  Store,
  install,
  mapState,
  mapGetters,
  mapActions,
  mapMutations
}

// import { Store, install } from 'vuex';
export {
  Store,
  install,
  mapState,
  mapGetters,
  mapActions,
  mapMutations
}



// Vuex持久化插件 vuex-persists插件
function persists (store) {
  let local = localStorage.getItem('VUEX:STATE');

  if (local) {
    store.replaceState(JSON.parse(local))
  }

  store.subscribe((mutation, state) => {
    // 频繁操作就要考虑一下防抖节流
    localStorage.setItem('VUEX:STATE', JSON.stringify(state));
  })
}
/*
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storeInstance = new Vuex.Store({
  strict: true, // 严格模式下，只能通过 mutation 来更改状态
  plugins: [
    persists
  ],
  state,
  getters,
  mutations,
  actions,
  modules,
});

export default storeInstance;

// 注册模块 `myModule`
storeInstance.registerModule('myModule', {
  // ...
})

new Vue({
  router,
  store: storeInstance,
  render: h => h(App),
}).$mount('#app');


// 辅助函数
import { mapState, mapMutations } from 'vuex';

computed: {
  ...mapState([age]),
  age () {
    return this.$store.state.age;
  }
},
methods: {
  ... mapMutations(['changeAge']),
  changeAge (payload) {
    this.$store.commit('changeAge', payload);
  }
}
*/