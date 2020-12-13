<template>
	<view>
		<view class="show_address"  v-for="(item, index) in getAllAddress" :key="index">
			<view class="status_btn" v-if="item.state==1">
				<button type="warn" @click="updateStatus(item.addressId,item.state)">默认</button>
			</view>
			<view class="status_btn" v-else>
				<button type="primary" @click="updateStatus(item.addressId,item.state)">设为默认</button>
			</view>
			<view class="address_item">
				<view class="tiem-one">
					<text class="one-left">{{item.buyerName}}</text>
					<text class="one-right">{{item.buyerPhone}}</text>
					
				</view>
				<view class="item-two">
					<view class="two-left">{{item.buyerAddress}}</view>
					<view class="two-right" @click="editerAddress(item.addressId)"><uni-icons type="compose" size="30"></uni-icons></view>
				</view>
			</view>
		</view>		
		<view class="add_address">
			<navigator url="/pages/address/addAddress/addressAdd"><uni-icons type="plusempty" color="blue" size="30rpx"></uni-icons>添加收货地址</navigator>	
    	</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	const api = require('@/utils/api.js');
	export default {
		data() {
			return {
				openId:'',
				getAllAddress:[]
			}
		},
		onLoad() {
			this.getAddressList();
		},
		methods: {
			getAddressList(){
				let _this=this;
				_this.openId=uni.getStorageSync("openid");
				console.log(_this.openId);
				uni.request({
                            url: api.localUrl+'addressInfo/selectList',
                                data: {
									buyerOpenid:_this.openId

                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
                                     _this.getAllAddress=res.data
                                    console.log(res)
                                     }
                         });
			},
			editerAddress(addressId){
				let _this=this;
				console.log(addressId)
				uni.navigateTo({
					url:"/pages/address/updateAddress/updateAddress?addressId="+addressId
				})
			},

			//设置默认值
			updateStatus(addressId,state){
				let _this=this;
				if(state==0){
					uni.request({
                            url: api.localUrl+'addressInfo/updateById',
                                data: {
									addressId:addressId,
									state:1
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
                                     
										uni.redirectTo({
											url: '/pages/address/showAddress/showAddress'
										});
										uni.showToast({
											title: '设置成功！',
										});
                                 }
                         });
				}else{
					uni.request({
                            url: api.localUrl+'addressInfo/updateById',
                                data: {
									addressId:addressId,
									state:0
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
                                     
										uni.redirectTo({
											url: '/pages/address/showAddress/showAddress'
										});
										uni.showToast({
											title: '设置成功！',
										});
                                 }
                         });
				}
				
			}
		},
		components: {	
			uniIcons,
			uniNavBar,
			uniTag
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

	.status_btn{
		width: 100%;	
		height: 70rpx;
	}
	.status_btn button{
		width: 170rpx;
		border-radius: 50rpx;
		float: right;
		height: 70rpx;
		font-size: 26rpx;
		margin-right: 40rpx;
	}

	.show_address{
		width: 100%;
		height: 200rpx;
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
		margin-top: -30rpx;
		width: 150rpx;
	}
	.add_address{
		width: 100%;
		height: 100rpx;
		background-color:white;
		position: absolute;
		left: 0;
		bottom: 0;

	}
	.add_address navigator{
		width:100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: blue;
	}

</style>
