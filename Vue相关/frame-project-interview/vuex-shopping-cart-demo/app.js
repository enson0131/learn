import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import { currency } from './currency'

Vue.filter('currency', currency) // 转换为 `$19.99` 格式，无需过多关注

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
