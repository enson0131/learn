<template>
    <p>state B</p>
</template>

<script>
export default {
    mounted() {
        // eslint-disable-next-line
        console.log('B mounted')
    },
    destroyed() {
        // eslint-disable-next-line
        console.log('B destroyed')
    }
}
</script>