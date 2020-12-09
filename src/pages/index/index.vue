<template>
	<view class="content">
		<uni-notice-bar :showGetMore="true" v-if="noticeText" showClose="true" showIcon="true" :text="noticeText"></uni-notice-bar>
		<view class="shop_position">
			{{shopPosition}}
		</view>
		<!--位置距离-->
		<view class="distance">
    		<view>
        		距离您{{distance}}千米
    		</view>
    		<navigator class="distance_nav" url="" hover-class="navigator-hover" open-type="navigate">
        		<view>
           	 		查看门店信息<uni-icons type="forward" size="30rpx"></uni-icons>
        		</view> 
    		</navigator>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	const util = require("@/utils/util.js")
	export default {
		data() {
			return {
				//通知信息
				noticeText:"新店开张，欢迎各位光临！",   
				//商店所在位置的纬度和经度
				latitude2:23.280177,
				longitude2:113.2414,
				distance:0 , //与门店的距离
				//门店地位名称
				shopPosition:"江高店（亿达广场商场3楼）"
			}
		},
		onLoad() {
			//获取两地之间的距离
			this.getUserLocation();
		},
		methods: {
			 
	 // 计算距离函数
 	Rad(d) { 
  //根据经纬度判断距离
  	return d * Math.PI / 180.0;
	},

	getDistance(lat1, lng1, lat2, lng2) {
  // lat1用户的纬度
  // lng1用户的经度
  // lat2商家的纬度
  // lng2商家的经度
  	var radLat1 = this.Rad(lat1);
  	var radLat2 = this.Rad(lat2);
  	var a = radLat1 - radLat2;
  	var b = this.Rad(lng1) - this.Rad(lng2);
  	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  	s = s * 6378.137;
  	s = Math.round(s * 10000) / 10000;
  	s = s.toFixed(1) //保留两位小数
  	console.log('经纬度计算的距离:' + s)
  	return s
	},
  
 //获取当前位置
 getUserLocation(){
     //获取当前位置  
     uni.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log("当前位置:", res)
        //定义常量来调用getDistance函数
        this.distance = this.getDistance(res.latitude, res.longitude, 
          this.latitude2, this.longitude2);
      }
	})
 }
	},
		components: {
			uniNoticeBar,
			uniIcons
		}
	}
</script>

<style>
	.shop_position{
		height: 70rpx;
		line-height: 70rpx;
		padding-left: 20rpx;
		font-size: 35rpx;
		font-weight: bold;
	}
	.distance{
    font-size: 25rpx;
    height: 70rpx;
		}
	.distance view{
    	float: left;
    	line-height: 70rpx;
    	margin-left: 30rpx;
	}
	.distance_nav{
    	float: right;
    	line-height: 70px;
    	margin-right: 20rpx;
	}

</style>
