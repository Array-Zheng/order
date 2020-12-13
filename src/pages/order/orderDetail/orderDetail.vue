<template>
	<view>
        <view class="order_detail_card">
			<view class="header">
				<image mode="heightFix" src="/static/images/finsh.png"></image>
				<text>完成交易</text>
			</view>
			<view class="dis"></view>
			<view class="adress">
				<text>郑伟然/18344223290</text>
				<text class="font_size_min">广东省简单快捷</text>
			</view>
			<view >
				<view class="product_list">
					<view>
						<text>商品名称/x2</text>
						<text class="text-right">￥67</text>
					</view>
					<view class="font_size_min">甜度：丰富的，口感：都可，份量：大</view>
				</view>
			</view>
			<view class="sum">
				<text>合计</text>
				<text class="text-right">￥67</text>
			</view>
			<view class="time font_size_min">
				下单：2020-9-09
			</view>
		</view>
    </view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	const api = require('@/utils/api.js');
	export default {
		data() {
			return {
				title: '订单编号：',
				getOrderDetail:{},
			}
		},
		onLoad(option) {
			this.getDetail(option.orderId)
		},
		methods: {
			getDetail(orderId){
				let _this=this;
				console.log(orderId);
				this.openid=uni.getStorageSync("openid");
				uni.request({
                            url: api.localUrl+'OrderMaster/getOpenIdOrOrderIdAll',
                                data: {
									orderId:orderId
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
                                     _this.getOrderDetail=res.data
                                    console.log(getOrderDetail)
                                     }
                         });
			}
			
		},
		components: {uniCard}
	}
</script>

<style>
	.order_detail_card{
		width: 686rpx;
		margin: 30rpx;
		border-radius: 40rpx;
		border: 1px solid silver;
	}
	.header{
		width: 100%;
		height: 250rpx;
		margin-top: 30rpx;
		border-bottom: 1px  dashed rgb(159, 161, 163);
	}
	.header image{
		margin-left: 293rpx;
		height: 100rpx;
	}
	.header text{
		height: 80rpx;
		margin-left: 270rpx;
		text-align: center;
		color: rgb(159, 161, 163);
		line-height: 80rpx;
	}
	.dis{
		height: 20rpx;
		border-bottom: 1px  dashed rgb(159, 161, 163);
	}
	.adress,.product_list{
		height: 160rpx;
		border-bottom: 1px  dashed rgb(159, 161, 163);
		width: 100%;
	}
	.adress text,.product_list view{
		height: 70rpx;
		line-height: 70rpx;
		width: 100%;
		float: left;
		padding-left: 20rpx;
	}
	.font_size_min{
		font-size: 30rpx;
		color: rgb(162, 163, 163);
	}
	.product_list view text,.sum text{
		width: 330rpx;
		float: left;
	}
	.text-right{
		text-align: right;
	}
	.sum{
		height: 80rpx;
		width: 100%;
		border-bottom: 1px  dashed rgb(159, 161, 163);
		line-height: 80rpx;
	}
	.time{
		height: 70rpx;
		line-height: 70rpx;
	}
</style>