<template>
  <div id="app">
    <p @click="changeName">{{name}}</p>
    <ul>
        <li v-for="(item, index) in list" :key="index">
            {{item}}
        </li>
    </ul>
    <button @click="addItem">添加一项</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
      return {
        name: 'vue',
        list: ['a', 'b', 'c']
      }
  },
  methods: {
    changeName() {
        this.name = '双越'
    },
    addItem() {
        this.list.push(`${Date.now()}`)
    }
  }
}
</script>

