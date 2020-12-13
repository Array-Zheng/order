<template>
	<view class="add-address">
		<view class="add-form">
			<view class="form-item">
				<input class="input" placeholder="联系人" v-model="buyerName" auto-focus />
			</view>
			<view class="form-item">
				<input class="input" v-model="buyerPhone" maxlength="15" type="number" placeholder="手机号码" />
			</view>
			<view class="form-item">
				<input class="input" v-model="buyerProAddress" placeholder="省份、城市、区县" />
			</view>
			<view class="form-item">
				<input class="input" v-model="addressDetail" placeholder="详细地址, 如街道、楼盘号等" />
			</view>

		</view>

		<view class="btns">
			<button class="cannel" @tap="cancelAddress">取消</button>
			<button class="save" @tap="saveAddress">保存</button>
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
				buyerProAddress:'',
				addressDetail:'',
				openId:""
            }
				
		},
		onLoad() {

        },
        methods: {
           saveAddress(){
			   let _this=this;

			   _this.openId=uni.getStorageSync("openid");

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


				if ( _this.buyerProAddress == 0) {
					uni.showToast({
						title: '请输入省市区',
						duration: 2000
					});
					return false;
				}

				if ( _this.addressDetail == '') {
					uni.showToast({
						title: '请输入详细地址',
						duration: 2000
					});
					return false;
				}
				console.log(_this.openId);
				uni.request({
                            url: api.localUrl+'addressInfo/insert',
                                data: {
									buyerOpenid:_this.openId,
									buyerName:_this.buyerName,
									buyerPhone:_this.buyerPhone,
									buyerAddress:_this.buyerProAddress+_this.addressDetail
                                },
								method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: (res) => {
									console.log(res)
									uni.navigateTo({
										url:"/pages/address/showAddress/showAddress"
									})
								},
									 fail(){
										 uni.showToast({
											title: '添加失败',
											duration: 2000
										});
									 }
                         });
		   },
		   cancelAddress(){
			    uni.navigateTo({
					url:"/pages/address/showAddress/showAddress"
				})
		   }
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background: #f4f4f4;
	}

	.add-address .add-form {
		background: #fff;
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.add-address .form-item {
		height: 116rpx;
		padding-left: 31.25rpx;
		border-bottom: 1px solid #d9d9d9;
		display: flex;
		align-items: center;
		padding-right: 31.25rpx;
	}

	.add-address .input {
		flex: 1;
		height: 44rpx;
		line-height: 44rpx;
		overflow: hidden;
	}

	.add-address .form-default {
		border-bottom: 1px solid #d9d9d9;
		height: 96rpx;
		background: #fafafa;
		padding-top: 28rpx;
		font-size: 28rpx;
	}

	.default-input {
		margin: 0 auto;
		display: block;
		width: 240rpx;
		height: 40rpx;
		padding-left: 50rpx;
		line-height: 40rpx;
		background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/checkbox-sed825af9d3-a6b8540d42.png) 1rpx -448rpx no-repeat;
		background-size: 38rpx 486rpx;
		font-size: 28rpx;
	}

	.default-input.selected {
		background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/checkbox-sed825af9d3-a6b8540d42.png) 0 -192rpx no-repeat;
		background-size: 38rpx 486rpx;
	}

	.add-address .btns {
		position: fixed;
		bottom: 0;
		left: 0;
		overflow: hidden;
		display: flex;
		height: 100rpx;
		width: 100%;
	}

	.add-address .cannel,
	.add-address .save {
		flex: 1;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 28rpx;
		color: #fff;
		border: none;
		border-radius: 0;
	}

	.add-address .cannel {
		background: #333;
	}

	.add-address .save {
		background: #b4282d;
	}


	.region-select {
		width: 100%;
		height: 600rpx;
		background: #fff;
		position: fixed;
		z-index: 10;
		left: 0;
		bottom: 0;
	}

	.region-select .hd {
		height: 108rpx;
		width: 100%;
		border-bottom: 1px solid #f4f4f4;
		padding: 46rpx 30rpx 0 30rpx;
	}

	.region-select .region-selected {
		float: left;
		height: 60rpx;
		display: flex;
	}

	.region-select .region-selected .item {
		max-width: 140rpx;
		margin-right: 30rpx;
		text-align: left;
		line-height: 60rpx;
		height: 100%;
		color: #333;
		font-size: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.region-select .region-selected .item.disabled {
		color: #999;
	}

	.region-select .region-selected .item.selected {
		color: #b4282d;
	}

	.region-select .done {
		float: right;
		height: 60rpx;
		width: 60rpx;
		border: none;
		background: #fff;
		line-height: 60rpx;
		text-align: center;
		color: #333;
		font-size: 28rpx;
	}

	.region-select .done.disabled {
		color: #999;
	}



	.region-select .bd {
		height: 492rpx;
		width: 100%;
		padding: 0 30rpx;
	}

	.region-select {
		height: auto;
		overflow: scroll;

	}

	.region-list {
		width: 100%;
		height: 100%;
		line-height: 104rpx;
		text-align: left;
		color: #333;
		font-size: 28rpx;
	}

	.region-select .item {
		width: 100%;
		height: 104rpx;
		line-height: 104rpx;
		text-align: left;
		color: #333;
		font-size: 28rpx;
	}

	.region-select .region-list .item.selected {
		color: #b4282d;
	}


	.bg-mask {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.4);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 8;
	}
</style>
