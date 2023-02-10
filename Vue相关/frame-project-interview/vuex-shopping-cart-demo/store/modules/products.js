import shop from '../../api/shop'

// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions —— 异步操作要放在 actions
const actions = {
  // 加载所有商品
  getAllProducts ({ commit }) {
    // 从 shop API 加载所有商品，模拟异步
    shop.getProducts(products => {
      commit('setProducts', products)
    })
  }
}

// mutations
const mutations = {
  // 设置所有商品
  setProducts (state, products) {
    state.all = products
  },

  // 减少某一个商品的库存（够买一个，库存就相应的减少一个，合理）
  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
