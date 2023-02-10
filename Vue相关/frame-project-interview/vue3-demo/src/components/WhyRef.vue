<template>
    <p>why ref demo {{state.age}} - {{age1}}</p>
</template>

<script>
import { ref, toRef, toRefs, reactive, computed } from 'vue'

function useFeatureX() {
    const state = reactive({
        x: 1,
        y: 2
    })

    return toRefs(state)
}

export default {
    name: 'WhyRef',
    setup() {
        const { x, y } = useFeatureX()

        const state = reactive({
            age: 20,
            name: '双越'
        })

        // computed 返回的是一个类似于 ref 的对象，也有 .value
        const age1 = computed(() => {
            return state.age + 1
        })

        setTimeout(() => {
            state.age = 25
        }, 1500)

        return {
            state,
            age1,
            x,
            y
        }
    }
}
</script>