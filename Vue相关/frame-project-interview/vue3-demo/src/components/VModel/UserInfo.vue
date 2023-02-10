<template>
    <input :value="name" @input="$emit('update:name', $event.target.value)"/>
    <input :value="age" @input="$emit('update:age', $event.target.value)"/>
</template>

<script>
export default {
    name: 'UserInfo',
    props: {
        name: String,
        age: String
    }
}
</script>