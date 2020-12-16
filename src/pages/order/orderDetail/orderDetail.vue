<template>
	<view>
        <view class="order_detail_card" v-for="(item, index) in getOrderDetail" :key="index">
			<view class="header">
				<image mode="heightFix" src="/static/images/finsh.png"></image>
				<text>完成交易</text>
			</view>
			<view class="dis"></view>
			<view class="adress">
				<text>{{item.buyerName}}/{{item.buyerPhone}}</text>
				<text class="font_size_min">{{item.buyerAddress}}</text>
			</view>
			<view >
				<view class="product_list"  v-for="(item, index) in orderDetailList" :key="index">
					<view class="product_list_image"><image src="{{localUrl ? localUrl+item.productInfo.productIcon: ''}}"></image></view>
					<view class="product_list_content">
						<view class="text-top">
							<text>{{item.productInfo.productName}}/x{{item.productQuantity}}</text>
							<text style="color:red;">￥{{item.productInfo.productPrice}}</text>
						</view>
						<view class="right-text">
							<text class="showcar-deal" v-if="item.productSweetness==0">甜度：少糖</text>
							<text class="showcar-deal" v-if="item.productSweetness==1">甜度：正常糖</text>
							<text class="showcar-deal" v-if="item.productSweetness==2">甜度：多糖 </text>
							<text class="showcar-deal" v-if="item.productIce==0">冰量：少冰</text>
							<text class="showcar-deal" v-if="item.productIce==1">冰量：正常冰</text>
							<text class="showcar-deal" v-if="item.productIce==2">冰量：热的 </text>
							<text class="showcar-deal" v-if="item.productDeal==0">份量：小份</text>
							<text class="showcar-deal" v-if="item.productDeal==1">份量：中份</text>
							<text class="showcar-deal" v-if="item.productDeal==2">份量：大份 </text>
						</view>
					</view>
				</view>
			</view>
			<view class="sum">
				<text class="text-left">合计</text>
				<text class="text-right" style="color:red;">{{item.orderAmount}}</text>
			</view>
			<view class="font_size_min">
				下单时间：{{item.createTime}}
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
				getOrderDetail:[],
				orderDetailList:[],
				localUrl:'http://10.64.65.84:8080'
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
                            url: api.localUrl+'orderMaster/getOpenIdOrOrderIdAll',
                                data: {
									orderId:orderId
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
									 _this.getOrderDetail=res.data
									 _this.orderDetailList=res.data[0].orderDetailList
                                    console.log(_this.getOrderDetail)
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
		height: 100%;
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
	.adress{
		width: 100%;
		height: 100rpx;
		border-bottom: 1px  dashed rgb(159, 161, 163);
		font-size: 27rpx;
		padding: 30rpx;
		float: left;
	}
	.adress text{
		width: 100%;
		float: left;
		height: 50rpx;
		line-height: 50rpx;

	}
	.font_size_min{
		font-size: 25rpx;
		color: rgb(162, 163, 163);
	}

	.product_list{
		width: 100%;
		height: 160rpx;
		float: left;
		margin-top: 20rpx;
		border-bottom: 1px  dashed rgb(159, 161, 163);

	}
	.product_list_image{
		width: 100rpx;
		height: 100rpx;
		float: left;
		padding-left: 30rpx;
	}
	.product_list_image image{
		width: 100rpx;
		height: 100rpx;
	}
	.product_list_content{
		width: 470rpx;
		float: left;
		font-size: 25rpx;
	}
	.text-top{
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
	}
	.text-top text{
		margin-left: 50rpx;
	}
	.right-text{
		width: 100%;
		margin-left: 50rpx;
	}
	.right-text text{
		margin-left: 10rpx;
	}
	.sum{
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
	}
	.text-left{
		width: 500rpx;
		float: left;
		padding-left: 30rpx;
	}
	.sum{
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		margin-left: 60rpx;
		float: left;
	}
	
	/*.adress,.product_list{
		height: 160rpx;
		border-bottom: 1px  dashed rgb(159, 161, 163);
		width: 100%;
		font-size: 30rpx;
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
	}*/
</style>