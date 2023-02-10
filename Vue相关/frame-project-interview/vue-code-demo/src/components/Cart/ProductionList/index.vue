<template>
    <div>
        <ProductionItem
            v-for="item in list"
            :key="item.id"
            :item="item"
        />
    </div>
</template>

<script>
import ProductionItem from './ProductionItem'

export default {
    components: {
        ProductionItem,
    },
    props: {
        list: {
            type: Array,
            default() {
                return [
                    // {
                    //     id: 1,
                    //     title: '商品A',
                    //     price: 10
                    // }
                ]
            }
        }
    }
}
</script>