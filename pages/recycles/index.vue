<template>
    <view>
        {{ status }}
    </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const status = ref("all");

onLoad((options) => {
    status.value = options.status;
})

</script>

<style lang="scss" scoped>
</style>