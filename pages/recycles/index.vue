<template>
    <view class="body">
        <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
            activeColor="#e1a62b" style="height: 80rpx; "></uni-segmented-control>
        <view class="content">
            <template v-for="(item, index) in statusAll" :key="item.value" >
                <records :status="item.value"  v-show="current === index" style="height:100%; display: flex; flex-direction: column;" />
            </template>
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import records from './components/records.vue';

const items = computed(() => statusAll.map(item => item.text))

const statusAll = [
    { text: "全部", value: "all" },
    { text: "待回收", value: "waiting" },
    { text: "待确认", value: "confirm" },
    { text: "已完成", value: "complete" },
    { text: "已取消", value: "cancel" }
]
const current = ref(0);


async function onClickItem(e) {
    current.value = e.currentIndex;
}

</script>

<style lang="scss" scoped>
.body {
    background-color: #f5f3f1;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;
    overflow: hidden;
}

.content {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 90rpx );
    padding: 0 20rpx;
}
</style>