<template>
	<view class="content">
		<view class="order_card">
			<view class="order-content">
				<text>订单编号：</text>
				<text>下单时间：</text>
			</view>	
			<view class="beizhu">备注：</view>
		</view>
		<view class="order-btn">
				<button type='primary'>确认送达</button>
				<button type="warn">详情</button>
		</view>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

		},
		components: {uniCard}
	}
</script>

<style>
	.content{
		width: 100%;
		margin: 20rpx;	
		padding: 0;
	}
	.order_card{
		width: 100%;
		border-bottom: 1px solid rgb(238, 232, 232);
		padding: 10rpx;
		margin-top: 10rpx;
	}
	.order-content text{
		width: 100%;
		float: left;
		font-size: 30rpx;
	}
	.beizhu{
		font-size: 30rpx;
	}
	.order-btn{
		border-bottom: 1px solid rgb(238, 232, 232);
		float: left;
		width: 100%;
		padding: 10rpx;
	}
	.order-btn button{
		width: 180rpx;
		float: right;
		font-size: 25rpx;
		margin-right: 40rpx;
		padding-bottom: 10rpx;
		border-radius: 80rpx;
	}
</style>
