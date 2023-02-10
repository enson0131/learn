<template>
    <p>{{name}} {{age}}</p>

    <user-info
        v-model:name="name"
        v-model:age="age"
    ></user-info>
</template>

<script>
import { reactive, toRefs } from 'vue'
import UserInfo from './UserInfo.vue'

export default {
    name: 'VModel',
    components: { UserInfo },
    setup() {
        const state = reactive({
            name: '双越',
            age: '20'
        })

        return toRefs(state)
    }
}
</script>
