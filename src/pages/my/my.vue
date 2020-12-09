<template>
	<view class="container">
        <view class="content-header">
            <view>
                <image mode="widthFix" src="/static/logo.png"></image>
                <text>小然然</text>
            </view>
           
        </view>
		<view class="content-center">
        
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
    
	.content-header{
        width: 100%;
        height: 250rpx;
        border: 1px solid red;
    }
    .content-header view{
        width: 150rpx;
        margin: 20rpx auto;
    }
    .content-header view image{
        width:100rpx;
        border-radius: 100%;
        float: left;
    }
    .content-header view text{
        width: 100rpx;
        text-align: center;
        float: left;
        border: 1px solid red;
    }
    .content-center{
        width: 100%;
        height: 120rpx;
    }
</style>
