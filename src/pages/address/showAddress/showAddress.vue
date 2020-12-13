<template>
	<view>
		
		<view class="show_address">
			<view class="address_item">
				<view class="tiem-one">
					<text class="one-left">郑伟然</text>
					<text class="one-right">18344223290</text>
				</view>
				<view class="item-two">
					<view class="two-left">jdioajoajoaerstdyfyugtredefrgtdyhujikuhygtrfedswdfghjkijuhygtfrddfghji</view>
					<view class="two-right"><uni-icons type="compose" size="30"></uni-icons></view>
				</view>
				
			</view>
		</view>		
		<view class="add_address">
			<navigator  @click="addAddress"><uni-icons type="plusempty" color="blue" size="30rpx"></uni-icons>添加收货地址</navigator>	
    	</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

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
	.show_address{
		width: 100%;
		height: 160rpx;
		background-color: white;
		padding: 30rpx;
	}
	
	.tiem-one{
		height: 50rpx;
		line-height: 50rpx;
		float: left;
	}
	.one-left{
		font-weight: bold;
	}
	.one-right{
		margin-left: 30rpx;
		font-size: 30rpx;
		color: rgb(200, 201, 202);
	}
	.item-two{
		margin-top:10rpx;
		float: left;
		width: 100%;
		
	}
	.two-left{
		float: left;
		width: 560rpx;
		word-break:break-all;
		font-size:30rpx;
		color: rgb(200, 201, 202);
	}
	.two-right{
		float: left;
		margin-left: 40rpx;
		margin-top: 20rpx;
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
