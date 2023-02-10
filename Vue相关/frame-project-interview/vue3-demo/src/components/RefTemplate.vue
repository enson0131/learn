<template>
    <p ref="elemRef">我是一行文字</p>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    name: 'RefTemplate',
    setup() {
        const elemRef = ref(null)

        onMounted(() => {
            console.log('ref template', elemRef.value.innerHTML, elemRef.value)
        })

        return {
            elemRef
        }
    }
}
</script>