<template>
	<view class="ctn">
		<!-- 顶部导航选项 -->
		<view class="topctn"> 
		  <view class="slct" :class="{act:currentTab==0}" :data-current="0" @click="dianji">待付款</view>
		  <view class="slct" :class="{act:currentTab==1}" :data-current="1" @click="dianji">已付款</view>
		  <view class="slct" :class="{act:currentTab==2}" :data-current="2" @click="dianji">已取餐</view>
		  <view class="slct" :class="{act:currentTab==3}" :data-current="3" @click="dianji">订单完成</view>
		</view>
		
		<!-- 内容标签 -->
		<swiper class="swiperslct" :current="currentTab" duration="200" @change="huadong">
		<swiper-item>
			<view class="order"  v-for="(item, index) in WaitPay" :key="index">
				<view class="order-left">
					<view class="left-item">订单号：{{item.orderId}}</view>
					<view class="left-item">总金额：<text>￥{{item.orderAmount}}</text></view>
					<view class="left-item-text">
						<text>备注:{{item.orderRemark}}</text>
						<text>下单时间：{{item.createTime}}</text>
					</view>
				</view>
				<view class="order-right">
					<view class="right-one">
						<uni-icons @click="deleteOrder(item.orderId)" size="30" type="trash"></uni-icons>
					</view>
					<view class="right-two">
						<button type="primary" @click="toPayOrder(item.orderId)">付款</button>
						<button type="warn" @click="getOrderDetail(item.orderId)">详情</button>
					</view>
				</view>
			</view>
		</swiper-item>
		
		<swiper-item >
				<view class="order"  v-for="(item, index) in finshPay" :key="index">
				<view class="order-left">
					<view class="left-item">订单号：{{item.orderId}}</view>
					<view class="left-item">总金额：<text>￥{{item.orderAmount}}</text></view>
					<view class="left-item-text">
						<text>备注:{{item.orderRemark}}</text>
						<text>下单时间：{{item.createTime}}</text>
					</view>
				</view>
				<view class="order-right">
					<view class="right-one">
						<uni-icons @click="deleteOrder(item.orderId)" size="30" type="trash"></uni-icons>
					</view>
					<view class="right-two">
						<button type="primary" @click="tofinshEat(item.orderId)">取餐</button>
						<button type="warn" @click="getOrderDetail(item.orderId)">详情</button>
					</view>
				</view>
			</view>
		</swiper-item>
		
		<swiper-item>
			<view class="order"  v-for="(item, index) in finshEat" :key="index">
				<view class="order-left">
					<view class="left-item">订单号：{{item.orderId}}</view>
					<view class="left-item">总金额：<text>￥{{item.orderAmount}}</text></view>
					<view class="left-item-text">
						<text>备注:{{item.orderRemark}}</text>
						<text>下单时间：{{item.createTime}}</text>
					</view>
				</view>
				<view class="order-right">
					<view class="right-one">
						<uni-icons @click="deleteOrder(item.orderId)" size="30" type="trash"></uni-icons>
					</view>
					<view class="right-two">
						<button type="primary">评论</button>
						<button type="warn" @click="getOrderDetail(item.orderId)">详情</button>
					</view>
				</view>
			</view>
		</swiper-item>
		
		<swiper-item>
			<view class="order"  v-for="(item, index) in finshOrder" :key="index">
				<view class="order-left">
					<view class="left-item">订单号：{{item.orderId}}</view>
					<view class="left-item">总金额：<text>￥{{item.orderAmount}}</text></view>
					<view class="left-item-text">
						<text>备注:{{item.orderRemark}}</text>
						<text>下单时间：{{item.createTime}}</text>
					</view>
				</view>
				<view class="order-right">
					<view class="right-one">
						<uni-icons @click="deleteOrder(item.orderId)" size="30" type="trash"></uni-icons>
					</view>
					<view class="right-two">
						<button type="primary">再来一单</button>
						<button type="warn" @click="getOrderDetail(item.orderId)">详情</button>
					</view>
				</view>
			</view>
		</swiper-item>
		</swiper>
	</view>
</template>

<script>
import uniIcons from "@/components/uni-icons/uni-icons.vue"
import UniIcons from '../../../components/uni-icons/uni-icons.vue';
const api = require('@/utils/api.js');
	export default {
		data() {
			return {
				currentTab:'0',
				WaitPay:[],
				finshPay:[],
				finshEat:[],
				finshOrder:[]
			}
		},
		onLoad() {
			this.getWaitPay();
			this.getFinshPay();
			this.getFinshEat();
			this.getFinshOrder();
		},
		methods: {
			dianji(e) {
			     console.log(e);
				 var that = this;
				     if (this.currentTab === e.target.dataset.current) {
				       return false;
				     } else {
				       that.currentTab = e.target.dataset.current;
				     }
			   },
			   huadong (e) {
			     console.log(e);
				 var that = this;
				 that.currentTab = e.detail.current;
			},
			//等待付款
			getWaitPay(){
				let _this=this;
				uni.request({
                            url: api.localUrl+'orderMaster/selectList',
                                data: {
									buyerOpenid: _this.openid, 
									payStatus:2
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
                                     _this.WaitPay=res.data
                                    console.log("shuju"+res)
                                     }
                         });
			},

			getFinshPay(){
				let _this=this;
				uni.request({
                            url: api.localUrl+'orderMaster/selectList',
                                data: {
									buyerOpenid: _this.openid, 
									payStatus:0
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
                                     _this.finshPay=res.data
                                    console.log("shuju"+res)
                                     }
                         });
			},

			getFinshEat(){
				let _this=this;
				uni.request({
                            url: api.localUrl+'orderMaster/selectList',
                                data: {
									buyerOpenid: _this.openid, 
									payStatus:1
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
                                     _this.finshEat=res.data
                                    console.log("shuju"+res)
                                     }
                         });
			},
			getFinshOrder(){
				let _this=this;
				uni.request({
                            url: api.localUrl+'orderMaster/selectList',
                                data: {
									buyerOpenid: _this.openid, 
									payStatus:3
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
                                     _this.finshOrder=res.data
                                    console.log("shuju"+res)
                                     }
                         });
			},

			//删除操作
			deleteOrder(orderId){
				let _this=this;
				uni.showModal({
					title: '提示',
					content: '确定删除',
					success: function (res) {
						if (res.confirm) {
							uni.request({
                            url: api.localUrl+'orderMaster/delete',
                                data: {
									orderId:orderId
								
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
                                     uni.showToast({
										 title:'删除成功'
									 })
									 uni.navigateTo({
										url: '/pages/order/orderList/orderList',
										success(){
											let page = getCurrentPages().pop(); //跳转页面成功之后
											if (!page) return; 
												page.onLoad(); //如果页面存在，则重新刷新页面
											}
									});
                                     }
                         });
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			//获取详情
			getOrderDetail(orderId){
				uni.navigateTo({
					url: '/pages/order/orderDetail/orderDetail?orderId='+orderId
				})
			},

			tofinshEat(orderId){
				uni.request({
                            url: api.localUrl+'orderMaster/updateById',
                                data: {
									orderId:orderId,
									payStatus:1
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
									uni.navigateTo({
										url: '/pages/takefood/takefood'
									});
                                    uni.showToast({
										title:'取餐成功' 
									})
									
                                     }
						 });
			},

			toPayOrder(orderId){
				uni.request({
                            url: api.localUrl+'orderMaster/updateById',
                                data: {
									orderId:orderId,
									payStatus:0
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
									uni.navigateTo({
										url: '/pages/takefood/takefood'
									});
                                    uni.showToast({
										title:'取餐成功' 
									})
									
                                     }
						 });
			}

		},
		components: {
			
			uniIcons
		}
	}
</script>

<style>
.ctn{
	width: 100%;
	height: 100vh;
	overflow: scroll;
	background-color: #dedede;
}
.topctn{
	width: 100%;
	display: flex;
	background-color: #fff;
	padding: 20rpx 0;
}
.slct{
	margin: auto;
	padding: 20rpx;
}
.act{
	border-bottom: 1rpx solid #ef00a7;
	color: #ef00a7;
}
.swiperslct{
	height: 100%;
}
.order{
	width: 100%;
	padding-left: 40rpx;
	
	height: 180rpx;
	border-bottom: 1px solid rgb(250, 249, 252);
}
.order-left{
	width: 450rpx;
	float: left;
}
.order-right{
	width: 250rpx;
	float: left;
}
.left-item{
	height: 50rpx;
	line-height: 50rpx;
	font-size: 17rpx;
}
.left-item-text text{
	width: 100%;
	float: left;
	font-size: 20rpx;
	height: 30rpx;
	line-height: 30rpx;
}
.right-one{
	width: 100%;
	height: 100rpx;
	float: left;
	padding-left: 80rpx;
	padding-top: 10rpx;
}
.right-two  button{
	width: 110rpx;
	font-size: 25rpx;
	height: 60rpx;
	float: left;
	margin-left: 10rpx;
}
</style>