<template>
	<view>
			<view class="addAddress-info">
				<view>
					<label>联系人：</label>
					<view class="addr-in"><input name="name" v-model="buyerName" :placeholder="buyerName" type="text"></view>
				</view>
				<view>
					<label>电话：</label>
					<view class="addr-in"><input name="phone" v-model="buyerPhone" :placeholder="buyerPhone" type="text"></view>
				</view>
				<view>
					<label>地址：</label>
					<view class="addr-in"><input name="address" v-model="buyerAddress" :placeholder="buyerAddress" type="text"></view>
				</view>
			
		</view>
		<view class="addr-btn">
				<button type="primary" @click="updateAddress()">修改</button>
				<button type="warn" @click="deteleAddress(addressId)">删除</button>
		</view>
    </view>
</template>

<script>
const api = require('@/utils/api.js');
	export default {
		
		data() {
			return {
				buyerName:'',
				buyerPhone:'',
				buyerAddress:'',
				addressId:''
			}
		},
		onLoad(option) {
			this.addressId=option.addressId;
			this.getAddress();
		},
		methods: {
			//获取地址信息
			getAddress(){
				
				let _this=this;
				
				uni.request({
                    url: api.localUrl+'addressInfo/selectList',
                        data: {
							addressId:_this.addressId
                         },
						method: 'POST',
                        header: {
                            'content-type': 'application/json'
                         },
                        success: (res) => {
							_this.buyerName=res.data[0].buyerName,
							_this.buyerPhone=res.data[0].buyerPhone,
							_this.buyerAddress=res.data[0].buyerAddress
							console.log(res)
							console.log(res.data[0].buyerPhone)
                         }
                         });
			},
			//修改地址信息
			updateAddress(){
				let _this=this;
				if ( _this.buyerName == '') {
					uni.showToast({
						title: '请输入姓名',
						duration: 2000
					});

					return false;
				}

				if ( _this.buyerPhone == '') {
					uni.showToast({
						title: '请输入手机号码',
						duration: 2000
					});
					return false;
				}


				if ( _this.buyerAddress == 0) {
					uni.showToast({
						title: '请输入地址',
						duration: 2000
					});
					return false;
				}

				uni.showModal({
					title: '提示',
					content: '确定修改',
					success: function (res) {
						if (res.confirm) {
							uni.request({
								url: api.localUrl+'addressInfo/updateById',
									data: {
										addressId:_this.addressId,
										buyerName:_this.buyerName,
										buyerPhone:_this.buyerPhone,
										buyerAddress:_this.buyerAddress,
									},
									method: 'POST',
									header: {
										'content-type': 'application/json'
									},
									success: (res) => {
										uni.showToast({
											title: '修改成功！',
										});
										uni.redirectTo({
											url: '/pages/address/showAddress/showAddress'
										});
									},
									fail(){
										uni.showToast({
											title: '修改失败！',
										});
									}
									});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			//删除地址信息
			deteleAddress(){
				let _this=this;
				console.log(_this.addressId)
				uni.showModal({
					title: '提示',
					content: '确定删除？',
					success: function (res) {
						if (res.confirm) {
							uni.request({
								url: api.localUrl+'addressInfo/delete',
									data: {
										addressId:_this.addressId
									},
									method: 'POST',
									header: {
										'content-type': 'application/json'
									},
									success: (res) => {
										uni.showToast({
											title: '删除成功！',
										});
										uni.redirectTo({
											url: '/pages/address/showAddress/showAddress'
										});
									},
									fail(){
										uni.showToast({
											title: '删除失败！',
										});
									}
									});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
		
	}
</script>

<style>
	page{
		margin: 0;
		padding: 0;
		background-color: rgb(229, 226, 226);
	}
	
	.addAddress-info{
		width: 100%;
		margin-top: 20rpx;
		background-color: rgb(255, 254, 254);
	}
	.addAddress-info view{
		width: 708rpx;
		margin:0 20rpx;
		border-bottom: 1px solid rgb(229, 226, 226);
		height: 90rpx;
		line-height: 90rpx;
	}
	.addAddress-info view label{
		width: 200rpx;
		float: left;
		
	}
	.addr-in input {
		padding-top:30rpx;
		font-size: 26rpx;
	}
	.addr-btn{
		width: 100%;
		
		margin-top: 50rpx;
		
	}
	.addr-btn button{
		width: 200rpx;
		float: left;
		font-size: 30rpx;
		margin-left:115rpx;
	}
</style>
