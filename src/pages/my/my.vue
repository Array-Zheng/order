<template>
	<view class="container">
        <view class="content-header">
            <view>
                <image mode="widthFix" src="/static/logo.png"></image>
                <text>你好啊</text>
            </view>
           
        </view>
		<view class="content-center">
            <uni-list>
                <uni-list-item thumb="/static/images/qiandao.png" :showArrow="true"  title="每日签到" ></uni-list-item>
                <uni-list-item thumb="/static/images/shouchang.png" :showArrow="true" title="我的收藏" ></uni-list-item>
                <uni-list-item thumb="/static/images/youhui.png" :showArrow="true"  title="优惠买单" ></uni-list-item>
                <uni-list-item thumb="/static/images/dingdan.png" :showArrow="true" title="全部订单" ></uni-list-item>
                <uni-list-item thumb="/static/images/address.png" :showArrow="true"  title="收货地址" ></uni-list-item>
                <uni-list-item thumb="/static/images/kefu.png" :showArrow="true"  title="联系商家" ></uni-list-item>
                <uni-list-item thumb="/static/images/women.png" :showArrow="true" title="关于我们" ></uni-list-item>
            </uni-list>
        </view>
	</view>
</template>

<script>
import uniList from '../../components/uni-list/uni-list.vue'
    //导入列表组件
	export default {
  components: { uniList },
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
    
</style>
