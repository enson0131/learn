<template>
    <div>
        <ProductionList :list="productionList"/>
        <hr>
        <CartList
            :productionList="productionList"
            :cartList="cartList"
        />
    </div>
</template>

<script>
import ProductionList from './ProductionList/index'
import CartList from './CartList/index'
import event from './event'

export default {
    components: {
        ProductionList,
        CartList
    },
    data() {
        return {
            productionList: [
                {
                    id: 1,
                    title: '商品A',
                    price: 10
                },
                {
                    id: 2,
                    title: '商品B',
                    price: 15
                },
                {
                    id: 3,
                    title: '商品C',
                    price: 20
                }
            ],
            cartList: [
                {
                    id: 1,
                    quantity: 1 // 购物数量
                }
            ]
        }
    },
    methods: {
        // 加入购物车
        addToCart(id) {
            // 先看购物车中是否有该商品
            const prd = this.cartList.find(item => item.id === id)
            if (prd) {
                // 数量加一
                prd.quantity++
                return
            }
            // 购物车没有该商品
            this.cartList.push({
                id,
                quantity: 1 // 默认购物数量 1
            })
        },
        // 从购物车删除一个（即购物数量减一）
        delFromCart(id) {
            // 从购物车中找出该商品
            const prd = this.cartList.find(item => item.id === id)
            if (prd == null) {
                return
            }

            // 数量减一
            prd.quantity--

            // 如果数量减少到了 0
            if (prd.quantity <= 0) {
                this.cartList = this.cartList.filter(
                    item => item.id !== id
                )
            }
        }
    },
    mounted() {
        event.$on('addToCart', this.addToCart)
        event.$on('delFromCart', this.delFromCart)
    }
}
</script>