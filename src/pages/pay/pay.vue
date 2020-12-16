<template>
	<view class="content">
		<view class="show_address"   v-for="(item, index) in address" :key="index">
				<button type="warn" class="address_btn">默认地址</button>
			<view class="address_item">
				<view class="tiem-one">
					<text class="one-left">{{item.buyerName}}</text>
					<text class="one-right">{{item.buyerPhone}}</text>
					
				</view>
				<view class="item-two">
					<view class="two-left">{{item.buyerAddress}}</view>
					<view class="two-right"> <uni-icons @click="toAddress()" type="compose" size="30"></uni-icons></view>
				</view>
			</view>
		</view>	

        <view class="showcar">
			<view class="car-show" v-for="(item, index) in cartList" :key="index">
				<view class="showcar-group">
					<view class="showcar-item">
						<text>{{item.productName}}</text>
						<text class="item-price">￥{{item.productSumprice}}</text>
					</view>  
					<view class="showcar-deal" v-if="item.productSweetness==0">甜度：少糖</view>
					<view class="showcar-deal" v-if="item.productSweetness==1">甜度：正常糖</view>
					<view class="showcar-deal" v-if="item.productSweetness==2">甜度：多糖 </view>
					<view class="showcar-deal" v-if="item.productIce==0">冰量：少冰</view>
					<view class="showcar-deal" v-if="item.productIce==1">冰量：正常冰</view>
					<view class="showcar-deal" v-if="item.productIce==2">冰量：热的 </view>
					<view class="showcar-deal" v-if="item.productDeal==0">份量：小份</view>
					<view class="showcar-deal" v-if="item.productDeal==1">份量：中份</view>
					<view class="showcar-deal" v-if="item.productDeal==2">份量：大份 </view>
				</view>
				<view class="showcar-box">
					<!--<uni-number-box :value="value" @change="getCarNum"></uni-number-box>-->
					<text style="margin-left:90rpx;">{{item.productQuantity}}份</text>
				</view>

			</view>
            <view class="sumPrice">
                总金额：<text style="color:red;">{{CarsPrice}}</text>
            </view>
			<view>
				<label for="">订单备注</label>
				<input class="remark-input" v-model="orderRemark" placeholder="订单备注" />
			</view>
		</view>	

        <view class="pay_btn">
            <button type="primary" @click="toPay()">立即支付</button>
            <button type="warn" @click="closePay()">取消支付</button>
        </view>

	</view>
	
</template>

<script>
import uniIcons from "@/components/uni-icons/uni-icons.vue"
const api = require('@/utils/api.js');
	export default {
		data() {
			return {
                address:[],
                cartList:[],
				CarsPrice:0,
				orderRemark:'',   //订单备注 
				openid:'' ,
				addOrder:[],
				insertOrder:{}
			}
		},
		onLoad(option) {
            this.openid=uni.getStorageSync("openid");
            this.CarsPrice=option.CarsPrice;
            this.getCartList();
			this.getAddress();
			console.log("df"+this.addOrder)
		},
		methods: {
            getPayInfo(CarsPrice){

			},
	
            //获取要下单的商品信息
            getCartList(){
                let _this=this;
                _this.cartList=uni.getStorageSync("cars")
				console.log("67"+_this.cartList)
				_this.cartList.forEach(v=>{
					console.log("v"+v)
					_this.addOrder.push({productSweetness:v.productSweetness,productDeal:v.productDeal,productIce:v.productIce,productQuantity:v.productQuantity,productId:v.productId})
				})
				console.log(JSON.stringify(_this.cartList))
			},
			
            //获取地址
            getAddress(){
                let _this=this;
					
					//获取默认收货地址
					uni.request({
						url: api.localUrl+'addressInfo/selectList',
						data: {
							state:1
						},
						method: 'POST',
						header: {
							'content-type': 'application/json'
						},
						success: (res) => {
                            _this.address=res.data
                            console.log(_this.address)
						}
					});
			},
			
            //跳转到地址
            toAddress(){
                uni.navigateTo({
                    url:'pages/address/showAddress/showAddress'
                })
            },

            //立即支付
            toPay(){
				let _this=this
                uni.showModal({
                    title: '支付提示',
                    content: '确定支付？',
                    success: function (res) {
                        if (res.confirm) {
                            if(_this.address!=null){
								uni.request({
									url: api.localUrl+'orderMaster/insert',
									data: {
										buyerName:_this.address[0].buyerName,
									    buyerPhone:_this.address[0].buyerPhone,
									    buyerAddress:_this.address[0].buyerAddress,
									    buyerOpenid:_this.openid,
									    orderAmount:_this.CarsPrice,
									    orderRemark:_this.orderRemark,
										orderDetailList:_this.addOrder
									},
									method: 'POST',
									header: {
										'content-type': 'application/json'
									},
									success: (res) => {
										uni.removeStorageSync("cars")
										uni.showToast({
											title:'支付成功'
										})
										uni.navigateBack({
											delta:1
										})
									}
								});
							}else{
								uni.showToast({
									title:'请选择地址'
								})
							}
                            console.log('用户点击确定');
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },

            //取消支付
            closePay(){
                uni.showModal({
                    title: '支付提示',
                    content: '确定取消支付？',
                    success: function (res) {
                        if (res.confirm) {
                            uni.navigateTo({
								url:'/pages/index/index'
							})
                            console.log('用户点击确定');
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            }
		}
		,
		components: {  
        	  uniIcons,
    	}  
	}
</script>

<style>
	page{
		width:100%;
		margin:0;
		padding:0;
		background-color: rgb(229, 226, 226);
	}

	
	.address_btn{
		width: 170rpx;
		border-radius: 50rpx;
		float: right;
		height: 70rpx;
		font-size: 26rpx;
		margin-right: 40rpx;
	}

	.show_address{
		width: 100%;
		height: 180rpx;
		background-color: white;
		padding: 30rpx;
		margin-top:20rpx;
	}
	
	.tiem-one{
		height: 50rpx;
		
		float: left;
	}
	.one-left{
		font-weight: bold;
		line-height: 50rpx;
	}
	.one-right{
		margin-left: 30rpx;
		font-size: 30rpx;
		color: rgb(176, 176, 177);
		line-height: 50rpx;
	}
	.item-two{
		margin-top:20rpx;
		float: left;
		width: 100%;
		
	}
	.two-left{
		float: left;
		width: 560rpx;
		word-break:break-all;
		font-size:30rpx;
		color: rgb(176, 176, 177);
	}
	.two-right{
		float: left;
		margin-left: 40rpx;
		margin-top: -10rpx;
		width: 150rpx;
	}
	.showcar{
		width: 100%;
		padding-left: 50rpx;
		background-color: rgb(240, 239, 240);
		
	}

	.showcar-group{
		width: 450rpx;
		float: left;
	}

	.showcar-item{
		width: 400rpx;
		float: left;
		font-size: 30rpx;
	}

	.showcar-item text{
		height: 50rpx;
		line-height: 50rpx;
		width: 200rpx;
		float: left;
	}
	.item-price{
		color: red;
	}
	.showcar-deal{
		width: 130rpx;
		float: left;
		font-size: 20rpx;
		height: 50rpx;
		line-height: 50rpx;
		color: rgb(181, 181, 182);
	}
	.showcar-box{
		width: 270rpx;
		float: right;
		margin-right: 60rpx;
		margin-top: -70rpx;
	}
    .car-show{
		height: 120rpx;
		width:100%;
		padding-top: 20rpx;
		border-bottom: 1px solid rgb(151, 151, 151);
	}

    .pay_btn{
        width: 100%;
    }
    .pay_btn button{
        width:250rpx;
        margin-top: 50rpx;
        margin-left: 70rpx;
        float: left;
    }

    .sumPrice{
        width: 100%;
        height: 70rpx;
        line-height: 70rpx;
        
    }
</style>