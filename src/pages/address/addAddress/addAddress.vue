<template>
	<view>
	<view class="add-address">
		<form @submit="formSubmit" @reset="formReset">
			<view class="addAddress-info">
				<view>
					<label>联系人：</label>
					<view class="addr-in"><input name="name" type="text"></view>
				</view>
				<view>
					<label>电话：</label>
					<view class="addr-in"><input name="phone" type="text"></view>
				</view>
				<view>
					<label>地址：</label>
					<view class="addr-in"><input name="address" type="text"></view>
				</view>
				<view>
					<label>补充说明：</label>
					<view class="addr-in"><input name="beizhu" type="text"></view>
				</view>
			</view>
			<view>
				<button type="primary" form-type="submit">增加</button>
			</view>
		</form>
        
		</view>
    </view>
</template>

<script>
	export default {
		
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			
		}
		
	}
</script>

<style>
	page{
		margin: 0;
		padding: 0;
		background-color: rgb(229, 226, 226);
	}
	.add-address{
		width: 100%;
		margin-top: 20rpx;
	}
	.addAddress-info{
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
	.addr-in {
		margin-top:20rpx;
	}
</style>
