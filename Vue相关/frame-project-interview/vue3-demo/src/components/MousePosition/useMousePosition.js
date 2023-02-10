import { reactive, ref, onMounted, onUnmounted } from 'vue'

function useMousePosition() {
    const x = ref(0)
    const y = ref(0)

    function update(e) {
        x.value = e.pageX
        y.value = e.pageY
    }

    onMounted(() => {
        console.log('useMousePosition mounted')
        window.addEventListener('mousemove', update)
    })

    onUnmounted(() => {
        console.log('useMousePosition unMounted')
        window.removeEventListener('mousemove', update)
    })

    return {
        x,
        y
    }
}

// function useMousePosition2() {
//     const state = reactive({
//         x: 0,
//         y: 0
//     })

//     function update(e) {
//         state.x = e.pageX
//         state.y = e.pageY
//     }

//     onMounted(() => {
//         console.log('useMousePosition mounted')
//         window.addEventListener('mousemove', update)
//     })

//     onUnmounted(() => {
//         console.log('useMousePosition unMounted')
//         window.removeEventListener('mousemove', update)
//     })

//     return state
// }

export default useMousePosition
// export default useMousePosition2
