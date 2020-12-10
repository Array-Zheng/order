<template>
	<view class="content">
		<view class="shop_image">
            <image src="/static/images/shopInfo.jpg" mode="scaleToFill"></image>
        </view>
        <view class="shop_list">
                <uni-list >
                    <uni-list-item thumb="/static/images/dianpu.png" title="江高店（亿达广场商场3楼）" note="广州市白云区江高镇亿达广场商场3楼"></uni-list-item>
                    <uni-list-item thumb="/static/images/tese.png" title="本店特色" note="这是一家非常有特色的饮料店，饮料香甜可口，值得品尝"></uni-list-item>
                    <uni-list-item thumb="/static/images/yinyeshijian.png" title="营业时间" rightText="8:00-22:30" ></uni-list-item>
                    <uni-list-item thumb="/static/images/phone.png" :showArrow="true" title="联系我们" rightText="13640567890"></uni-list-item>
                    <uni-list-item thumb="/static/images/address.png" :showArrow="true" title="查看地图" rightText="导航到店"></uni-list-item>
                </uni-list>
            </view>
	</view>
</template>

<script>
    import uniList from '../../components/uni-list/uni-list.vue'
	export default {
        components: { uniList },
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
    .shop_image{
        width: 100%;
        height: 350rpx;
    }
    .shop_image image{
        height: 100%;
    }
	
    
	
</style>