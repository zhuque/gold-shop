<template>
    <view class="body">
        <view class="shop">
            <view class="shop-header">门店信息</view>
            <view class="shop-content">
                <view class="item">
                    <view class="item-label">门店名称：</view>
                    <view class="item-value">{{ order.shop?.name }}</view>
                </view>
                <view class="item">
                    <view class="item-label">门店地址：</view>
                    <view class="item-value">{{ order.shop?.address }}</view>
                </view>
                <view class="item">
                    <view class="item-label">门店电话：</view>
                    <view class="item-value">{{ order.shop?.phone }}</view>
                </view>
            </view>
        </view>
        <view class="order">
            <view class="order-header">订单信息</view>
            <view class="order-content">
                <view class="item">
                    <view class="item-label">订单编号：</view>
                    <view class="item-value">{{ order.orderNo }}
                        <view class="copy-btn" @click="copyOrderNo">复制</view>
                    </view>
                </view>
                <view class="item">
                    <view class="item-label">订单状态：</view>
                    <view class="item-value">
                        <view class="status-label">{{ order.statusLabel }}</view>
                    </view>
                </view>
                <view class="item">
                    <view class="item-label">下单时间：</view>
                    <view class="item-value">{{ order.createdAt }}</view>
                </view>
                <view class="item">
                    <view class="item-label">订单总重：</view>
                    <view class="item-value">{{ order.weight }} 克</view>
                </view>
                <view class="item">
                    <view class="item-label">预估金额：</view>
                    <view class="item-value">{{ order.amount?.toFixed(2) }} 元</view>
                </view>
            </view>
        </view>
        <view class="items">
            <view class="items-header">回收物品</view>
            <template v-for="item in order.items" :key="item.id">
                <view class="item">
                    <view class="item-label">类型：</view>
                    <view class="item-value">{{ item.category }}</view>
                </view>
                <view class="item">
                    <view class="item-label">重量：</view>
                    <view class="item-value">{{ item.weight?.toFixed(2) }} 克</view>
                </view>
                <view class="item">
                    <view class="item-label">总价：</view>
                    <view class="item-value">{{ item.amount?.toFixed(2) }} 元</view>
                </view>
            </template>
        </view>

        <view class="footer">
            <view class="footer-btn cancel-btn" v-if="showCancel">
                <view class="footer-btn-text" @click="onCancel">取消</view>
            </view>
            <view class="footer-btn confirm-btn" v-if="showConfirm">
                <view class="footer-btn-text" @click="onConfirm">确认</view>
            </view>
        </view>

        <view class="contact-btn">
            <uni-button type="primary" @contact="onContact" open-type="contact">联系客服</uni-button>
        </view>
    </view>
</template>

<script setup>
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
import { getSellOrder, cancelSellOrder, confirmSellOrder } from '@/api/user'
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import { useRecycleStore } from '@/stores/recycle'

const recycleStore = useRecycleStore();
const statusLabels = recycleStore.getStatusLabels();

const order = ref({})
const id = ref('')
onLoad((options) => {
    id.value = options.id
    loadData()
})

async function loadData() {
    if (!id.value) {
        return
    }
    const { data } = await getSellOrder(id.value)
    order.value = data
    order.value.createdAt = dayjs(order.value.createdAt).format('YYYY-MM-DD HH:mm:ss')
    order.value.statusLabel = statusLabels[order.value.status]
}

function copyOrderNo() {
    uni.setClipboardData({
        data: order.value.orderNo,
        success: () => {
            uni.showToast({
                title: '复制成功',
                icon: 'success'
            })
        }
    })
}

async function onCancel() {
    try {
        const { code } = await cancelSellOrder(id.value)
        if (code !== 0) {
            uni.showToast({
                title: msg,
                icon: 'error'
            })
            return
        }
        uni.showToast({
            title: '取消成功',
            icon: 'success'
        })
        loadData()
    } catch (error) {
        uni.showToast({
            title: '取消失败',
            icon: 'error'
        })
    }
}

async function onConfirm() {
    // TODO: 确认
}

function onContact() {
    // uni.makePhoneCall({
    //     phoneNumber: '13800138000'
    // })
    console.log('onContact')
}

onPullDownRefresh(async () => {
    try {
        await loadData()
    } catch (error) {
        console.error(error)
    } finally {
        uni.stopPullDownRefresh()
    }
})

const showCancel = computed(() => order.value.status === 'draft')
const showConfirm = computed(() => ['draft', 'pending'].includes(order.value.status))
</script>

<style lang="scss" scoped>
.body {
    background-color: #f5f3f1;
    height: 100vh;
    padding: 0 20rpx;
}

.shop,
.order,
.items {
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 5rpx;
    padding: 20rpx;
    font-size: 25rpx;
    color: #333;
}

.shop-header,
.order-header,
.items-header {
    font-size: 28rpx;
    margin-bottom: 20rpx;
    padding-left: 12rpx;
    position: relative;
}

.shop-header::before,
.order-header::before,
.items-header::before {
    content: '';
    display: block;
    width: 4rpx;
    height: 28rpx;
    background-color: #9b010e;
    position: absolute;
    left: 0;
    top: 6rpx;
}

.shop-content,
.order-content,
.items-content {
    display: flex;
    flex-direction: column;
    gap: 10rpx;
}

.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20rpx;

    .item-label {
        color: #666;
    }

    .item-value {
        color: #666;
    }
}

.status-label {
    color: #19946f;
    border: 1rpx solid #19946f;
    border-radius: 5rpx;
    padding: 2rpx 10rpx;
    font-size: 20rpx;
}

.copy-btn {
    color: #8b711b;
    margin-left: 10rpx;
    cursor: pointer;
    display: inline-block;
    border: 1rpx solid #8b711b;
    padding: 2rpx 10rpx;
    border-radius: 5rpx;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40rpx;
    gap: 20rpx;

    .footer-btn {
        flex: 1;
        text-align: center;
        padding: 20rpx;
        color: #fff;
        border-radius: 10rpx;
        cursor: pointer;
        font-size: 28rpx;
    }

    .cancel-btn {
        background-color: #edc431;
    }

    .confirm-btn {
        background-color: #56d50c;
    }
}

.contact-btn {
    margin-top: 20rpx;
    text-align: center;
    padding: 20rpx;
    font-size: 28rpx;
    text-decoration: underline;
}
</style>