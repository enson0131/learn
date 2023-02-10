<template>
  <div class="about">
    <h1>This is an about page3</h1>
    <!-- <Ref></Ref> -->
    <ToRef @handleEmit="handleEmit"/>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import Ref from '@/components/Ref.vue'
import ToRef from '@/components/ToRef.vue'
export default {
  components: {
    ToRef,
  },
  // 等于 beforeCreate 和 created
  setup() {
    console.log(`setup`);

    onBeforeMount(() => {
      console.log(`onBeforeMount`)
    })

    onMounted(() => {
      console.log(`onMounted`)
    })

    onBeforeUpdate(() => {
      console.log(`onBeforeUpdate`)
    })

    onUpdated(() => {
      console.log(`onUpdated`)
    })

    onBeforeUnmount(() => {
      console.log(`onBeforeUnmount`);
    })

    onUnmounted(() => {
      console.log(`onUnmounted`);
    })
    
    const handleEmit = () => {
      console.log(`handleEmit----->`)
    }

    return {
      handleEmit
    }
  },
  beforeCreate() {
    console.log(`beforeCreate`)
  },
  created () {
    console.log(`created`)
  },
  beforeMount () {
    console.log(`beforeMount`)
  },
  mounted () {
    console.log(`mounted`)
  },
  beforeUpdate () {
    console.log(`beforeUpdate`)
  },
  updated () {
    console.log(`updated`)
  },
  beforeUnmount () {
    console.log(`beforeUnmount`)
  },
  unmounted () {
    console.log(`unmounted`)
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
