<template>
	<image src="/static/imgs/banner.jpg" mode="widthFix" style="width: 100%;" />
	<view class="index-page">
		<view class="card" style="background: #f5f3f1;">
			<view style="display: flex; align-items: center;">
				<view style="font-size: 40rpx; color:#000; font-weight: 600; display: flex; align-items: center;">
					<image src="/static/imgs/recycle.svg" mode="widthFix"
						style="width: 40rpx; height: 40rpx; margin-right: 10rpx;" />
					黄金回收
				</view>
				<view style="font-size: 20rpx; color:#818181; margin-left: 20rpx;">（参照上海黄金交易所实时金价 ）</view>
			</view>
			<view style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
				<view style="display: flex; align-items: baseline;">
					<view style="font-size:100rpx; color:#9b010e; font-weight: bold;">{{ price }}</view>
					<view style="font-size: 35rpx; color:#000000; margin-left: 10rpx;">元/克</view>
				</view>
				<view class="btn" @click="handleSell">我要卖金 ></view>
			</view>
		</view>
		<view class="card" style="background: #fff;">
			<view class="shop-item-header">
				<view class="shop-item-header-title-box">
					<view class="shop-item-header-title">
						{{ shopInfo.shopName }}
					</view>
					<view class="shop-item-header-distance">距离您：{{ shopInfo.distance }}
					</view>
				</view>
				<view class="shop-item-header-link">商家详情 ></view>
			</view>

			<view class="shop-item-list">
				<view class="shop-item">
					<image src="/static/imgs/serve.png" class="shop-item-img" mode="widthFix" />
					<view class="shop-item-text">添加客服</view>
				</view>
				<view class="shop-item">
					<image src="/static/imgs/tel.png" class="shop-item-img" mode="widthFix" />
					<view class="shop-item-text">联系电话</view>
				</view>

				<view class="shop-item">
					<image src="/static/imgs/nav.png" class="shop-item-img" mode="widthFix" />
					<view class="shop-item-text">门店导航</view>
				</view>

				<view class="shop-item">
					<image src="/static/imgs/wechat.png" class="shop-item-img" mode="widthFix" />
					<view class="shop-item-text">门店微信</view>
				</view>
			</view>
		</view>

		<!-- 回收流程 -->
		<view class="card" style="background: #fff;">
			<view class="shop-item-header">
				<view class="shop-item-header-title-box">
					<view class="shop-item-header-title">
						回收流程
					</view>
					<view class="shop-item-header-distance">（请您务必携带身份证）</view>
				</view>
				<view class="shop-item-header-link">新手指导 ></view>
			</view>

			<view class="shop-item-list">
				<image src="/static/imgs/process.png" mode="widthFix" style="width: 100%; height: auto;" />
			</view>
		</view>

		<!-- 合作伙伴 -->
		<view class="card" style="background: #fff;">
			<view class="shop-item-header">
				<view class="shop-item-header-title-box">
					<view class="shop-item-header-title">
						合作伙伴
					</view>
				</view>
			</view>

			<view class="shop-item-list">
				<image src="/static/imgs/partners.png" mode="widthFix" style="width: 100%; height: auto;" />
			</view>
		</view>

		<view class="card" style="background: #fff;">
			<view class="shop-item-header">
				<view class="shop-item-header-title-box">
					<view class="shop-item-header-title">
						门店展示
					</view>
				</view>
			</view>

			<view class="shop-list">
				<view class="shop-list-item" v-for="shop in shops" :key="shop.id">
					<image :src="shop.thumb" mode="aspectFill" class="shop-list-item-img" lazy-load />
					<view class="shop-list-info">
						<view class="shop-list-info-address">
							{{ shop.address }}
						</view>
						<view class="shop-list-info-name">
							{{ shop.name }}
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 中国投资金文化品牌 -->
		<view class="card" style="background: #8b151a; color: #fff;">
			<view class="card-title">
				<view style="font-size: 33rpx; font-weight: 500;">
					中国投资金文化品牌
				</view>
				<view style="font-size: 12rpx;">
					点金印记隶属深圳市点金贵金属精炼有限公司
				</view>
			</view>
			<view class="card-content" style="font-weight: 300;">
				<view>上海黄金交易所可提供标准金锭（金条）企业资质</view>
				<view>|</view>
				<view>CNAS权威检测</view>
			</view>
			<view class="card-content">
				<image src="/static/imgs/logo-white.png" mode="widthFix"
					style="width: 100%; height: auto; color: #fff; margin: 30rpx 0;" />
			</view>
		</view>

	</view>


</template>

<script setup>
import { ref } from 'vue';
import { getPhone, getUserInfo } from '@/api/user';
import { userStore } from '@/stores/user';

const user = userStore();
const price = ref(759);
const shopInfo = ref({
	shopName: '周大福',
	distance: '1.2km',
})

const shops = ref([
	{
		name: '周大福',
		address: '深圳市罗湖区东门街道卢新街道购物中心',
		thumb: 'https://www.mpdaogou.com/caijiimg/2024/03/28/2024032821360238591.jpg',
	},
	{
		name: '深圳 一方城店',
		address: '深圳市罗湖区东门街道卢新街道购物中心',
		thumb: 'https://qcloud.dpfile.com/pc/VKcfKwFmAPNRTLeD9HNKFMURkaTUTyo-Nah11utS7iD21L7rPkwJGCXtDZ8mcPBlY0q73sB2DyQcgmKUxZFQtw.jpg',
	},
	{
		name: '深圳 一方城店',
		address: '深圳市罗湖区东门街道卢新街道购物中心',
		thumb: '',
	},
])

const handleSell = async () => {
	if (user.isAuth) {
		const { data } = await getUserInfo()
		console.log('data', data)
		if (!data.phone) {
			uni.navigateTo({
				url: '/pages/login/index',
			})
		}
		return
	}

	uni.login({
		provider: 'weixin',
		success: async (res) => {
			console.log('success', res)
			const { data } = await user.login(res.code)
			console.log('data', data)
		}
	})
}
</script>

<style scoped>
.index-page {
	background: #f1ebea;
	padding: 10rpx 20rpx;
	margin: 0 auto;
	margin-top: -20rpx;
}

.card {
	border-radius: 20rpx;
	padding: 35rpx 35rpx;
	box-sizing: content-box;
	margin: 20rpx 0;
}

.btn {
	height: 72rpx;
	line-height: 72rpx;
	background: #9b010e;
	color: #fff;
	text-align: center;
	font-size: 38rpx;
	border-radius: 36rpx;
	padding: 0 30rpx;
	cursor: pointer;
}

.shop-item-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #e5e5e5;
	padding-bottom: 20rpx;
}

.shop-item-header-title-box {
	display: flex;
	align-items: baseline;
}


.shop-item-header-title {
	font-size: 30rpx;
	color: #000;
	font-weight: 600;
	padding-left: 10rpx;
	line-height: 1;
	position: relative;
}

.shop-item-header-title-box::before {
	content: '';
	display: block;
	width: 4rpx;
	height: 28rpx;
	background-color: #9b010e;
	position: relative;
	left: 0;
	top: 3rpx;
}

.shop-item-header-distance {
	font-size: 20rpx;
	color: #818181;
	margin-left: 10rpx;
}

.shop-item-header-link {
	font-size: 20rpx;
	color: #818181;
	margin-left: 20rpx;
	color: #9b010e;
}

.shop-item-list {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 25rpx;
}

.shop-item {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
}

.shop-item-img {
	width: 95rpx;
	height: 95rpx;
	margin-bottom: 10rpx;
}

.shop-item-text {
	font-size: 20rpx;
	color: #818181;
	text-align: center;
}

.card-title {
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	border-bottom: 0.5rpx solid #fff;
	padding-bottom: 10rpx;
}

.card-content {
	font-size: 20rpx;
	margin-top: 10rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.shop-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.shop-list-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 20rpx;
	gap: 20rpx;
}

.shop-list-info {
	display: flex;
	flex-direction: column;
	flex: 1 1 0;
	gap: 10rpx;
	justify-content: space-between;
	height: 188rpx;
}

.shop-list-item-img {
	width: 310rpx;
	height: 188rpx;
	border-radius: 20rpx;
	border: 4rpx solid #e5e5e2;
	flex-shrink: 0;
}

.shop-list-info-address {
	margin-top: 10rpx;
	font-size: 21rpx;
	color: #333;
}

.shop-list-info-name {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
	margin-bottom: 10rpx;
}
</style>
