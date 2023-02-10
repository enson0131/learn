<template>
  <div id="main">
      客户通测试工具
      <img :src="image" alt="" srcset="">
  </div>
</template>

<script>
import image from '@/assets/greenAlbums.png'
export default {
    setup() {
        console.log(`setup~`)
        const a = () => {
            console.log(`箭头函数`)
        }
        const p = new Promise(resolve => {
            resolve(1)
        }).then((v) => {
            console.log(`v`, v)
        });
        let b = 1;
        const c = 3;
        console.log(a, b, c, p)

        return {
            image
        }
    }
}
</script>

<style>
#main {
    color: aqua;
}
</style>