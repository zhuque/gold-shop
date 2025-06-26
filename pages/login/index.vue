<template>
    <view class="login-page">
        <image src="/static/imgs/logo.png" mode="widthFix" style="width: 90%; margin-bottom: 100rpx;" />
        <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="login-btn" >
            授权手机号一键登录
        </button>
    </view>
</template>

<script setup>
import { userStore } from '@/stores/user';
import { getPhone } from '@/api/user';
import { onLoad } from '@dcloudio/uni-app';

const user = userStore();
onLoad(() => {
    const info = user.user
    if (info && info.phone) {
        uni.navigateTo({
            url: '/pages/sell/index',
        })
    }
})

const getPhoneNumber = async (e) => {
    console.log('e', e)
    const { data, code } = await getPhone(e.detail.code)
    if (code === 0) {
        uni.navigateTo({
            url: '/pages/index/index',
        })
    }
}
</script>

<style scoped>
.login-page {
    padding: 20rpx;
    background: #fff;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-btn {
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    background: #9b010e;
    color: #fff;
    border-radius: 40rpx;
}
</style>