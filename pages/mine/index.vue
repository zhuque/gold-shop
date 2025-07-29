<template>
    <view class="container">
        <view class="header">
            <view class="header-left">
                <image src="@/static/imgs/avatar_default.svg" mode="widthFix"></image>
                <view>
                    <text>{{ userInfo?.username ?? '-' }}</text>
                    <text>{{ userInfo?.phone }}</text>
                </view>
            </view>
        </view>

        <view style="padding: 0 10rpx;">
            <view class="card">
                <view class="card-header">
                    <view class="card-header-title">回收订单</view>
                    <view class="card-header-link" @click="handleRecycle('all')">查看全部 <uni-icons type="arrowright" size="16" color="#999"></uni-icons></view>
                </view>
                <view class="card-body">
                    <view class="card-body-item" v-for="item in recycleItems" :key="item.title" @click="handleRecycle(item.status)">
                        <image :src="item.icon" mode="widthFix" class="card-body-item-icon"></image>
                        <view>{{ item.title }}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { userStore } from '@/stores/user';

const user = userStore();
const userInfo = computed(() => user.userInfo);


const recycleItems = ref([
    {
        title: '待回收',
        icon: '/static/imgs/mine/waiting.svg',
        link: '/pages/recycles/index?status=draft',
        status: "draft"
    },
    {
        title: '待确认',
        icon: '/static/imgs/mine/confirm.svg',
        link: '/pages/recycles/index?status=customer_pending_confirm',
        status: "customer_pending_confirm"
    },
    {
        title: '已完成',
        icon: '/static/imgs/mine/complete.svg',
        link: '/pages/recycles/index?status=completed',
        status: "completed"
    },
    {
        title: '已取消',
        icon: '/static/imgs/mine/cancel.svg',
        link: '/pages/recycles/index?status=cancelled',
        status: "cancelled"
    }
])


const handleRecycle = (status) => {
    uni.navigateTo({
        url: `/pages/recycles/index?status=${status}`
    })
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    background: #f1ebea;
    height: 100vh;
}

.header {
    width: 100%;
    height: 200rpx;
    background-color: #f5f3f1;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    box-sizing: border-box;

    .header-left {
        display: flex;
        align-items: center;

        image {
            width: 100rpx;
            height: 100rpx;
            border-radius: 50%;
            overflow: hidden;
        }
    }
}

.card-header-link {
    font-size: 20rpx;
    color: #818181;
    margin-left: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    border-radius: 20rpx;
    padding: 35rpx 35rpx;
    box-sizing: content-box;
    margin: 20rpx 0;
    background: #fff;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 20rpx;
    width: 100%;
    position: relative;
}

.card-header-title::before {
    content: '';
	display: block;
	width: 4rpx;
	height: 28rpx;
	background-color: #9b010e;
	position: absolute;
	left: 0;
	top: 4.5rpx;
}

.card-header-title {
    font-size: 30rpx;
	color: #000;
	font-weight: 600;
	padding-left: 12rpx;
	line-height: 1;
	position: relative;
}

.card-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 0;
    margin-top: 20rpx;
}

.card-body-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 0 0 1;
    font-size: 20rpx;
}

.card-body-item-icon {
    width: 64rpx;
    height: 64rpx;
    margin-bottom: 15rpx;
}
</style>