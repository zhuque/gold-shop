<template>
    <web-view :src="url" @message="handleMessage"></web-view>
</template>

<script setup>
import { ref } from 'vue';

const url = ref('')

onLoad((options) => {
    url.value = decodeURIComponent(options.url)
})

</script>

<style scoped lang="scss">

</style>