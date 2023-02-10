<template>
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" @onSayHello="sayHello"/> -->
  <!-- <life-cycles :msg="msg" v-if="flag"/> -->
  <!-- <Ref/> -->
  <!-- <ToRef/> -->
  <!-- <ToRefs/> -->
  <!-- <RefTemplate/> -->
  <!-- <WhyRef/> -->
  <!-- <VModel/> -->
  <!-- <MousePosition v-if="flag"/> -->
  <!-- <Watch/> -->
  <GetInstance/>

  <hr>
  <button @click="changeHandler">change msg</button>
  <button @click="changeFlagHandler">change flag</button>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import LifeCycles from './components/LifeCycles.vue'
import Ref from './components/Ref.vue'
import ToRef from './components/ToRef.vue'
import ToRefs from './components/ToRefs.vue'
import RefTemplate from './components/RefTemplate.vue'
import WhyRef from './components/WhyRef.vue'
import VModel from './components/VModel/index.vue'
import MousePosition from './components/MousePosition/index.vue'
import Watch from './components/Watch.vue'
import GetInstance from './components/GetInstance.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    LifeCycles,
    Ref,
    ToRef,
    ToRefs,
    RefTemplate,
    WhyRef,
    VModel,
    MousePosition,
    Watch,
    GetInstance
  },

  data() {
    return {
      msg: 'hello vue3',
      flag: true
    } 
  },
  methods: {
    changeHandler() {
      this.msg = 'hello vue3' + Date.now()
    },
    changeFlagHandler() {
      this.flag = !this.flag
    },
    sayHello(info) {
      console.log('hello', info)
    }
  }
}
</script>
