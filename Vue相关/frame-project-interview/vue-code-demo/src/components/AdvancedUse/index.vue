<template>
    <div>
        <p>vue 高级特性</p>
        <hr>

        <!-- 自定义 v-model -->
        <!-- <p>{{name}}</p>
        <CustomVModel v-model="name"/> -->

        <!-- nextTick -->
        <!-- <NextTick/> -->

        <!-- slot -->
        <!-- <SlotDemo :url="website.url">
            {{website.title}}
        </SlotDemo> -->
        <!-- <ScopedSlotDemo :url="website.url">
            <template v-slot="slotProps">
                {{slotProps.slotData.title}}
            </template>
        </ScopedSlotDemo> -->

        <!-- 动态组件 -->
        <!-- <component :is="NextTickName"/> -->
        
        <!-- 异步组件 -->
        <!-- <FormDemo v-if="showFormDemo"/>
        <button @click="showFormDemo = true">show form demo</button> -->

        <!-- keep-alive -->
        <!-- <KeepAlive/> -->

        <!-- mixin -->
        <MixinDemo/>
    </div>
</template>

<script>
// import CustomVModel from './CustomVModel'
// import NextTick from './NextTick'
// import SlotDemo from './SlotDemo'
// import ScopedSlotDemo from './ScopedSlotDemo'
// import KeepAlive from './KeepAlive'
import MixinDemo from './MixinDemo'

export default {
    components: {
        // CustomVModel
        // NextTick
        // SlotDemo,
        // ScopedSlotDemo,
        // FormDemo: () => import('../BaseUse/FormDemo'),
        // KeepAlive
        MixinDemo
    },
    data() {
        return {
            name: '双越',
            website: {
                url: 'http://imooc.com/',
                title: 'imooc',
                subTitle: '程序员的梦工厂'
            },
            // NextTickName: "NextTick",
            showFormDemo: false
        }
    }
}
</script>