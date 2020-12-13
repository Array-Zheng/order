<template>
	<view class="content">
	<view v-for="(item, index) in getFinshOrder" :key="index">
		<view class="order_card">
			<view class="order-content">
				<text>订单编号：{{item.orderId}}</text>
				<text>下单时间：{{item.createTime}}</text>
			</view>	
			<view class="beizhu">备注：{{item.orderRemark}}</view>
		</view>
		<view class="order-btn">
				<button type='primary'>确认送达</button>
				<button type="warn" @click="toOrderDetail(item.orderId)">详情</button>
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
				//待取餐的订单
				getFinshOrder:[],
				openid:''
			}
		},
		onLoad() {
			this.getOrder();
		},
		methods: {
			getOrder(){
				let _this=this;
				_this.openid=uni.getStorageSync("openid");
				console.log(_this.openid)
				if(!_this.openid==''){
					uni.request({
                            url: api.localUrl+'OrderMaster/selectList',
                                data: {
									buyerOpenid: _this.openid, 
									payStatus:0
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
                                     _this.getFinshOrder=res.data
                                    console.log(res)
                                     }
                         });
				}else{
					uni.showToast({
						title: '请先登录',
					});
				}
				
			},
			//跳转到详情页面
			toOrderDetail(orderId){
				uni.navigateTo({
					url: '/pages/order/orderDetail/orderDetail?orderId='+orderId
				});
			}
			
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
		margin-bottom: 20rpx;
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
