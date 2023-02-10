<template>
    <p>get instance</p>
</template>

<script>
import { onMounted, getCurrentInstance } from 'vue'

export default {
    name: 'GetInstance',
    data() {
        return {
            x: 1,
            y: 2
        }
    },
    setup() {
        console.log('this1', this)

        onMounted(() => {
            console.log('this in onMounted', this)
            console.log('x', instance.data.x)
        })

        const instance = getCurrentInstance()
        console.log('instance', instance)
    },
    mounted() {
        console.log('this2', this)
        console.log('y', this.y)
    }
}
</script>