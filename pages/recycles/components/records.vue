<template>
    <scroll-view scroll-y @scrolltolower="scrollToLower" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
        @refresherabort="onAbort" @refresherpulling="onPulling" :refresher-triggered="triggered"
        :refresher-threshold="45" refresher-enabled class="records">
        <view class="records-item" v-for="record in records" :key="record.id">
            <view class="records-header">
                <view class="records-header-title">订单号：{{ record.orderNo }}</view>
                <view class="records-header-status">{{ record.statusLabel }}</view>
            </view>
            <view class="records-content">
                <view class="records-content-item">
                    <view class="records-content-item-row">
                        <view class="records-content-item-row-label">类型：</view>
                        <view class="records-content-item-row-value">
                            <uni-tag :text="record.category" size="mini" type="default" />
                        </view>
                    </view>
                    <view class="records-content-item-row">
                        <view class="records-content-item-row-label">总重：</view>
                        <view class="records-content-item-row-value">{{ record.weight }}&nbsp;克</view>
                    </view>
                    <view class="records-content-item-row">
                        <view class="records-content-item-row-label">预计金额：</view>
                        <view class="records-content-item-row-value">{{ record.amount.toFixed(2) }}&nbsp;元</view>
                    </view>
                    <view class="records-content-item-row">
                        <view class="records-content-item-row-label">下单时间：</view>
                        <view class="records-content-item-row-value">{{ record.createdAt }}</view>
                    </view>
                </view>
                <view class="records-footer">
                    <view class="records-footer-button" @click="handleDetail(record)">查看详情</view>
                </view>
            </view>
        </view>
    </scroll-view>
</template>

<script setup>
import { getUserOrders } from '@/api/user';
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import dayjs from 'dayjs';
import { useRecycleStore } from '@/stores/recycle'

const recycleStore = useRecycleStore();
const statusLabels = recycleStore.getStatusLabels();

const loading = ref(false);
const page = ref(1);
const pageSize = ref(10);
const once = ref(true);
const finished = ref(false);

const status = defineModel('status', {
    type: String,
    default: 'all'
})

const triggered = ref(false);

const total = ref(0);
const records = ref([]);

function scrollToLower() {
    loadMore();
}

async function loadMore() {
    try {
        if (loading.value || finished.value) return;
        loading.value = true;
        const res = await getUserOrders(status.value, page.value, pageSize.value);
        const list = res.data.list;
        if (!list || list.length === 0) {
            finished.value = true;
            return;
        }
        if (list.length < pageSize.value) {
            finished.value = true;
        }
        const newRecords = list.map(item => ({
            ...item,
            statusLabel: statusLabels[item.status] || 'n/a',
            createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        }));
        page.value++;
        records.value = [...records.value, ...newRecords];
        total.value = res.data.total;
    } catch (error) {
        console.log('error', error);
    } finally {
        loading.value = false;
    }
}

onShow(() => {
    if (once.value) {
        loadMore();
        once.value = false;
    }
})

async function onRefresh() {
    triggered.value = true;
    page.value = 1;
    records.value = [];
    finished.value = false;
    await loadMore();
    triggered.value = false;
}



function onRestore() {
    // console.log('restore');
}

function onAbort() {
    // console.log('abort');
}

function onPulling() {
    // console.log('pulling');
}

function handleDetail(record) {
    uni.navigateTo({
        url: `/pages/recycles/detail?id=${record.id}`
    })
}
</script>

<style lang="scss" scoped>
.records {
    flex: 1;
    background-color: #f5f3f1;
    overflow-y: scroll;
}

.records-item {
    padding: 20rpx 30rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    
    .records-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.5rpx solid #ddd;
        padding: 20rpx 0;

        .records-header-title {
            font-size: 20rpx;
            color: #333;
        }

        .records-header-status {
            font-size: 20rpx;
            color: #e7c158;
            font-weight: 600;
        }
    }

    .records-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20rpx 0;
        font-size: 24rpx;
        color: #666;

        .records-content-item {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            gap: 10rpx;
            width: 100%;

            .records-content-item-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                .records-content-item-row-label {
                    width: 150rpx;
                }
                .records-content-item-row-value {
                    color: #333;
                }
            }
        }

    }

    .records-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 20rpx 0;

        .records-footer-button {
            width: 100rpx;
            background-color: #b39749;
            color: #fff;
            border-radius: 10rpx;
            text-align: center;
            font-size: 24rpx;
            padding: 10rpx 20rpx;
        }
    }

}
</style>