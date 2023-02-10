<template>
  <p>ref demo {{ageRef}} {{state.name}}</p>
  <p ref="pEleRef1">ref获取元素</p>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

export default {
  name: 'Ref',
  setup() {
    // 命名 xxxRef
    const ageRef = ref(20); // 值类型 响应式
    const nameRef = ref('enson');
    const pEleRef = ref(null);

    const state = reactive({
      name: nameRef
    })

    setTimeout(() => {
      console.log('ageRef', ageRef.value); // 通过.value获取值
      ageRef.value = 25; // .value修改值
      nameRef.value = 'enson1'; 
    }, 1500)

    onMounted(() => {
      console.log(pEleRef.value)
    })

    return {
      ageRef,
      state,
      pEleRef
    }
  }
}
</script>

<style>

</style>