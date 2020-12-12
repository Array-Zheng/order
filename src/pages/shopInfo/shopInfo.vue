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
                    <uni-list-item thumb="/static/images/phone.png" :clickable="true" @click="callPhone()" :showArrow="true" title="联系我们" :rightText="phoneNumber"></uni-list-item>
                    <uni-list-item thumb="/static/images/address.png" :showArrow="true" title="查看地图" rightText="导航到店"></uni-list-item>
                </uni-list>
        </view>
        <map style="width: 100%; height: 200px;" :latitude="latitude" :longitude="longitude" :markers="covers" show-location enable-3D	show-compass show-scale	enable-rotate enable-traffic ></map>
	</view>
</template>

<script>
    import uniList from '../../components/uni-list/uni-list.vue'
	export default {
        components: { uniList },
		data() {
			return {
                //商家地点
                latitude:23.280177,
                longitude:113.2414,
                //商家电话
                phoneNumber:"18344223290",
                
			}
		},
		onLoad() {

		},
		methods: {
            //联系商家
            callPhone(){
            //拨打电话
            uni.makePhoneCall({
                phoneNumber:this.phoneNumber, //电话号码
                // 成功回调
                success: (res) => {
                    console.log('调用成功!')	
                },
                // 失败回调
                fail: (res) => {
                    console.log('调用失败!')
                }
             });
            },
           
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
        width: 100%;
    }
	
    
	
</style>