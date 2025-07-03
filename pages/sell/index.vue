<template>
    <view class="container">
        <view class="card">
            <view class="card-header">
                <view class="card-header-left">
                    <span class="card-header-left-1">回收流程</span>
                    <span class="card-header-left-2">（请您务必携带身份证）</span>
                </view>
                <view class="card-header-right">
                    新手指导 >
                </view>
            </view>
            <view class="card-content">
                <image src="/static/imgs/process2.png" mode="widthFix" style="width: 100%;" />
            </view>
        </view>

        <view class="card">
            <view class="card-header">
                <view class="card-header-left">
                    <span class="card-header-left-1">{{ shopInfo.name }}</span>
                    <span class="card-header-left-2">距您{{ shopInfo.distance }}</span>
                </view>
                <view class="card-header-right">
                    门店详情
                </view>
            </view>
            <view class="card-content shop-card"
                :style="{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgb(255, 255, 255)), url(${shopInfo.thumb})` }">
                <view class="shop-card-content">
                    <view class="shop-card-content-item">
                        营业时间：{{ shopInfo.startTime }} - {{ shopInfo.endTime }}
                    </view>
                    <view class="shop-card-content-item">
                        地址：{{ shopInfo.address }}
                    </view>
                </view>
            </view>

            <view class="card-content shop-card-content-bottom">
                <!-- 添加客服 联系电话 门店导航 门店微信 -->
                <view>
                    <image src="/static/imgs/serve.png" mode="widthFix" class="shop-card-content-item-img" />
                    <view class="shop-card-content-item-text">添加客服</view>
                </view>
                <view>
                    <image src="/static/imgs/tel.png" mode="widthFix" class="shop-card-content-item-img" />
                    <view class="shop-card-content-item-text">联系电话</view>
                </view>
                <view>
                    <image src="/static/imgs/nav.png" mode="widthFix" class="shop-card-content-item-img" />
                    <view class="shop-card-content-item-text">门店导航</view>
                </view>
                <view>
                    <image src="/static/imgs/wechat.png" mode="widthFix" class="shop-card-content-item-img" />
                    <view class="shop-card-content-item-text">门店微信</view>
                </view>
            </view>
        </view>

        <view class="card">
            <view class="card-header">
                <view class="card-header-left">
                    <span class="card-header-left-1">回收货品</span>
                </view>
                <view class="card-header-right">
                    回收说明 >
                </view>
            </view>
            <view class="card-content">
                <view class="price-info">
                    <view class="price-info-item">
                        <view class="price-info-text">{{ price }}<span class="price-info-text-unit">元/克</span></view>
                        <view class="price-info-desc">实时金价</view>
                        <view class="price-info-tip">（足金9999）</view>
                    </view>
                    <view class="price-info-line"></view>
                    <view class="price-info-item">
                        <view class="price-info-text">{{ prePrice }}<span class="price-info-text-unit">元</span></view>
                        <view class="price-info-desc">预计回收金额</view>
                        <view class="price-info-tip">扣除服务费后</view>
                    </view>
                </view>
            </view>

            <view class="card-content" style="margin-top: 20rpx;">
                <view v-for="item in types" :key="item.name" class="type-item">
                    <view class="type-item-img-box">
                        <image :src="item.icon" mode="widthFix" class="type-item-img" />
                    </view>
                    <view>
                        <view class="type-item-text">{{ item.name }}克重</view>
                        <view class="type-item-desc">{{ item.desc }}</view>
                    </view>
                    <view class="type-item-input-box">
                        <input type="digit" class="type-item-input" v-model="item.weight" />
                        <view class="type-item-unit">克</view>
                    </view>
                </view>
            </view>
        </view>

        <view class="btn-box" @click="submitOrder">
            <view class="btn">提交订单</view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { priceStore } from '@/stores/price';

const priceSt = priceStore()
const price = computed(() => priceSt.price)

const shopInfo = ref({
    name: "店名",
    distance: "20km",
    phone: "13800138000",
    address: "广东省深圳市宝安区宝体路1号",
    distance: "20km",
    thumb: "http://res.zocai.com/news/upload/1402081150497165.jpg",
    startTime: "09:00",
    endTime: "18:00",
    status: "营业中",
})

const types = ref([
    {
        name: "饰品",
        icon: "/static/imgs/jewel.png",
        desc: "黄金戒指、项链、手镯等",
        pure: 0.9999,
        weight: null,
    },
    {
        name: "金条",
        icon: "/static/imgs/bar.png",
        desc: "金条、金币、收藏品等",
        pure: 0.9999,
        weight: null,
    },
])

const prePrice = computed(() => (types.value.reduce((acc, item) => acc + item.pure * item.weight * price.value, 0) * 0.95).toFixed(2))

const submitOrder = () => {
    if (types.value.some(item => item.weight === null || item.weight === "" || item.weight === 0)) {
        uni.showToast({
            title: "请输入克重",
            icon: "none"
        })
        return
    }
    uni.navigateTo({
        url: "/pages/sell/submit"
    })
}

</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;
    background-color: #f5f1f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20rpx;
}

.card {
    width: 90%;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 50rpx;
    margin-bottom: 20rpx;
    box-sizing: border-box;
}


.card-header {
    color: #000;
    font-weight: 500;
    padding-left: 10rpx;
    line-height: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1rpx solid #e5e5e5;
    padding-bottom: 20rpx;
}

.card-header::before {
    content: '';
    display: block;
    width: 4rpx;
    height: 28rpx;
    background-color: #9b010e;
    position: absolute;
    left: 0;
    top: 2rpx;
}

.card-header-left {
    font-size: 28rpx;
    color: #000;
    font-weight: 500;
    padding-left: 10rpx;
    line-height: 1;
    position: relative;
    padding-left: 10rpx;
}

.card-header-left-1 {
    font-size: 30rpx;
}

.card-header-left-2 {
    font-size: 23rpx;
    color: #888;
    margin-left: 10rpx;
}

.card-header-right {
    font-size: 23rpx;
    color: #9b0211;
    font-weight: 550;
    padding-left: 10rpx;
    line-height: 1;
    position: relative;
    padding-left: 20rpx;
}

.shop-card {
    width: 100%;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.shop-card-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 200rpx;
    width: 100%;
    padding: 20rpx;
}

.shop-card-content-bottom {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20rpx 0;
}

.shop-card-content-item {
    font-size: 25rpx;
    font-weight: 500;
    line-height: 1;
    text-shadow: rgb(247, 247, 245) 1px 0 10px;
    ;
    margin-bottom: 15rpx;
}

.shop-card-content-item-img {
    width: 95rpx;
    height: 95rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
}

.shop-card-content-item-text {
    font-size: 20rpx;
    font-weight: 500;
    line-height: 1;
    color: #818181;
}

.price-info {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20rpx 0;
    background: linear-gradient(to bottom, #faf4f3, #f0d7d8);
    border-radius: 20rpx;
}

.price-info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 0;
}

.price-info-text {
    font-size: 40rpx;
    color: #8e161b;
    font-weight: 600;
    margin-bottom: 10rpx;
}

.price-info-text-unit {
    font-size: 22rpx;
    font-weight: 500;
    margin-left: 10rpx;
}

.price-info-desc {
    font-size: 24rpx;
    color: #333;
    margin-bottom: 10rpx;
    font-weight: 550;
}

.price-info-tip {
    font-size: 17rpx;
    color: #818181;
}

.price-info-line {
    width: 1rpx;
    height: 120rpx;
    background-color: #a89d9c;
}

.type-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15rpx;
    width: 100%;
    gap: 20rpx;
}

.type-item-img-box {
    width: 140rpx;
    height: 140rpx;
    background-color: #f6f1f0;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.type-item-img {
    width: 90rpx;
    height: 90rpx;
}

.type-item-text {
    font-size: 30rpx;
    color: #000;
    font-weight: 550;
}

.type-item-desc {
    font-size: 20rpx;
}

.type-item-input-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10rpx;
}

.type-item-input {
    width: 100rpx; 
    height: 50rpx;
    border: 1rpx solid #848484;
    padding: 0 10rpx;
}

.type-item-unit {
    font-size: 20rpx;
    color: #333;
    margin-left: 10rpx;
}

.btn-box {
    width: 100%;
    height: 100rpx;
    background-color: #9b010e;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30rpx;
    font-weight: 550;
    cursor: pointer;
}
</style>