<template>
  <p>toRef demo - {{ageRef}} - {{state.age}} - {{state.name}}</p>
  <br>
  <p>toRefs demo - {{age}} - {{name}}</p>
</template>

<script>
import { reactive, toRef, toRefs, onMounted } from 'vue';
export default {
  emits: ['handleEmit'],
  setup(props, { emit }) {
    const state = reactive({
      age: 20,
      name: 'enson'
    })

    const ageRef = toRef(state, 'age');
    const stateAsRefs = toRefs(state);

    setTimeout(() => {
      state.age = 25;
    }, 1500)

    setTimeout(() => {
      ageRef.value = 30;
    }, 3000)

    onMounted(() => {
      setTimeout(() => {
        console.log(`触发handleEmit啦~`)
        emit('handleEmit', 1)
      }, 1000)
    })

    return {
      ...stateAsRefs,
      ageRef,
      state, // 这样就全部都是响应式的
      // ...state, // 这样的属性不是响应式的
    }
  }
}
</script>

<style>

</style>