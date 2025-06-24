<template>
    <view class="order-card" @click="handleOrderClick">
      <view class="order-header">
        <view class="order-header-left" style="display: flex; align-items: center;">
          <image class="shop-icon" src="/static/imgs/shop.svg" />
          <view class="shop-name">{{ order.shopName ?? '--' }}</view>
        </view>
        <uni-tag type="success" text="已完成" style="font-weight: 500;"/>
      </view>
      <view class="order-info" @click="handleOrderClick">
        <view class="order-row">
          <text>订单编号：</text>
          <text class="order-value">{{ order.orderId }}</text>
          <image class="copy-icon" src="/static/imgs/copy.svg" @click="copyOrderId" />
        </view>
        <view class="order-row">
          <text>手机号码：</text>
          <text class="order-value">{{ order.mobile }}</text>
        </view>
        <view class="order-row">
          <text>订单类型：</text>
          <text class="order-value">{{ order.typeLabel }}</text>
        </view>
        <view class="order-row">
            <text>检测克重：</text>
            <text class="order-value">{{ order.checkWeight ?? '--' }}</text>
        </view>
        <view class="order-row">
            <text>回收金额：</text>
            <text class="order-value">{{ order.amount ?? '--' }}</text>
        </view>
      </view>
      <view class="order-footer">
        <view class="order-time">
          <text>完成时间：</text>
          <text class="order-value">{{ order.completedTime ?? '--' }}</text>
        </view>
      </view>
    </view>
  </template>
  
  <script setup>
  import { defineModel, defineEmits } from 'vue'
  
  const emit = defineEmits(['update:order'])
  
  const order = defineModel('order', {
    type: Object,
    default: () => ({})
  })
  
  const handleOrderClick = () => {
    uni.navigateTo({
      url: `/pages/orders/detail?id=${order.value.id}`
    })
  }

  const copyOrderId = () => {
    uni.setClipboardData({
      data: order.value.orderId,
      success: () => {
        uni.showToast({
          title: '复制成功',
          icon: 'success'
        })
      }
    })
  }
  
  </script>
  
  <style scoped>
  .order-card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
    padding: 18px 18px 12px 18px;
    margin: 16px 12px;
    font-size: 15px;
  }
  
  .order-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .shop-icon {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }

  .order-header-left {
    display: flex;
    align-items: center;
  }

  .shop-name {
    font-weight: bold;
    color: #222;
    margin-right: 8px;
  }
  
  .wechat-icon {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
  
  .order-status {
    color: #3578e5;
    margin-left: auto;
    font-size: 12px;
  }
  
  .order-info {
    margin-bottom: 10px;
  }
  
  .order-row {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    font-size: 13px;
  }
  
  .order-value {
    color: #666;
    margin-left: 2px;
    margin-right: 4px;
  }
  
  .copy-icon {
    width: 16px;
    height: 16px;
  }
  
  .order-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }
  
  .order-time {
    color: #bbb;
    font-size: 12px;
  }
  
  .order-actions {
    display: flex;
    gap: 8px;
  }
  
  .cancel-btn {
    background: #fff;
    color: #3578e5;
    border: 1px solid #3578e5;
    border-radius: 6px;
    font-size: 12px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    position: relative;
    line-height: 1.5;
  }
  
  .countdown {
    color: #3578e5;
    font-size: 12px;
    padding: 2px 0;
  }
  
  .check-btn {
    background: #3578e5;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    padding: 0 9px;
    margin-left: 4px;
  }
  </style>
  