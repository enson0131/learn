<template>
    <div>
        <span>{{item.title}}</span>
        &nbsp;
        <span>(数量 {{item.quantity}})</span>
        &nbsp;
        <a href="#" @click="addClickHandler(item.id, $event)">增加</a>
        &nbsp;
        <a href="#" @click="delClickHandler(item.id, $event)">减少</a>
    </div>
</template>

<script>
import event from '../event'

export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    // id: 1,
                    // title: '商品A',
                    // price: 10,
                    // quantity: 1 // 购物数量
                }
            }
        }
    },
    methods: {
        addClickHandler(id, e) {
            e.preventDefault()
            event.$emit('addToCart', id)
        },
        delClickHandler(id, e) {
            e.preventDefault()
            event.$emit('delFromCart', id)
        }
    }
}
</script>