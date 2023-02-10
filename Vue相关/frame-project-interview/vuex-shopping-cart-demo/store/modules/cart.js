import shop from '../../api/shop'

// initial state
// shape: [{ id, quantity }]
const state = {
  // 已加入购物车的商品，格式如 [{ id, quantity }, { id, quantity }]
  // 注意，购物车只存储 id 和数量，其他商品信息不存储
  items: [],
  // 结账的状态 - null successful failed
  checkoutStatus: null
}

// getters
const getters = {
  // 获取购物车商品
  cartProducts: (state, getters, rootState) => {
    // rootState - 全局 state

    // 购物车 items 只有 id  quantity ，没有其他商品信息。要从这里获取。
    return state.items.map(({ id, quantity }) => {
      // 从商品列表中，根据 id 获取商品信息
      const product = rootState.products.all.find(product => product.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  },

  // 所有购物车商品的价格总和
  cartTotalPrice: (state, getters) => {
    // reduce 的经典使用场景，求和
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

// actions —— 异步操作要放在 actions
const actions = {
  // 结算
  checkout ({ commit, state }, products) {
    // 获取购物车的商品
    const savedCartItems = [...state.items]

    // 设置结账的状态 null
    commit('setCheckoutStatus', null)

    // empty cart 清空购物车
    commit('setCartItems', { items: [] })

    // 请求接口
    shop.buyProducts(
      products,
      () => commit('setCheckoutStatus', 'successful'), // 设置结账的状态 successful
      () => {
        commit('setCheckoutStatus', 'failed') // 设置结账的状态 failed
        // rollback to the cart saved before sending the request
        // 失败了，就要重新还原购物车的数据
        commit('setCartItems', { items: savedCartItems })
      }
    )
  },

  // 添加到购物车
  // 【注意】这里没有异步，为何要用 actions ？？？—— 因为要整合多个 mutation
  //        mutation 是原子，其中不可再进行 commit ！！！
  addProductToCart ({ state, commit }, product) {
    commit('setCheckoutStatus', null) // 设置结账的状态 null

    // 判断库存是否足够
    if (product.inventory > 0) {
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        // 初次添加到购物车
        commit('pushProductToCart', { id: product.id })
      } else {
        // 再次添加购物车，增加数量即可
        commit('incrementItemQuantity', cartItem)
      }
      // remove 1 item from stock 减少库存
      commit('products/decrementProductInventory', { id: product.id }, { root: true })
    }
  }
}

// mutations
const mutations = {
  // 商品初次添加到购物车
  pushProductToCart (state, { id }) {
    state.items.push({
      id,
      quantity: 1
    })
  },

  // 商品再次被添加到购物车，增加商品数量
  incrementItemQuantity (state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },

  // 设置购物车数据
  setCartItems (state, { items }) {
    state.items = items
  },

  // 设置结算状态
  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
