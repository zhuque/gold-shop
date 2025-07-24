<template>
    <view class="container">
        <web-view :src="url" @message="handleMessage"></web-view>
    </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const url = ref('')

onLoad((options) => {
    url.value = decodeURIComponent(options.url)
})

const handleMessage = (e) => {
    // TODO: 处理webview消息
    console.log('handleMessage', e)
}
</script>

<style scoped lang="scss">

</style>