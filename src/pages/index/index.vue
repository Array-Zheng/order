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
    		<navigator class="distance_nav" url="../shopInfo/shopInfo" hover-class="navigator-hover" open-type="navigate">
        		<view>
           	 		查看门店信息<uni-icons type="forward" size="30rpx"></uni-icons>
        		</view> 
    		</navigator>
		</view>
		<!--商品展示-->
		<view class="shop">
			<!-- 左侧菜单 -->
			<scroll-view scroll-y class="left_menu">
				<view class="menu_item">
					gfsd
				</view>
			</scroll-view>
			<!-- 右侧商品内容 -->
			<scroll-view :scroll-top="scrollTop" scroll-y class="right_content">
				<view class="index_swiper">
					<!-- 
					1 swiper标签存在默认的宽度和高度
						100% * 150px 
					2 image标签也存在默认的宽度和高度
						320px * 240px 
					3 设计图片和轮播图
						1 先看一下原图的宽高  750 * 340 
						2 让图片的高度自适应 宽度 等于100%
						3 让swiper标签的高度 变成和图片的高一样即可 
					4 图片标签
						mode属性 渲染模式
						widthFix  让图片的标签宽高 和 图片标签的内容的宽高都等比例的发生变化 
					-->
					<swiper autoplay indicator-dots circular>
						<swiper-item>
							<navigator url="">
								<image mode="scaleToFill" src="/static/images/shopInfo.jpg"></image>
							</navigator>
						</swiper-item>
						<swiper-item>
							<navigator url="">
								<image mode="scaleToFill" src="/static/images/shopInfo.jpg"></image>
							</navigator>
						</swiper-item>
					</swiper>
				</view>
				<view class="goods_list">
					<navigator>
						<image mode="scaleToFill" src="/static/images/shopInfo.jpg"></image>
						<view class="goods_name">好东西</view>
						<view class="goods_btn"><button type="warn">选规格</button></view>
					</navigator>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
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
				shopPosition:"江高店（亿达广场商场3楼）",
				openid:''
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
			uniIcons,
			uniSwiperDot
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.content{
		height: 100%;
	}
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
	.shop{
		height: 75%;
		width: 100%;
		margin-top: 20rpx;
	}

	.left_menu{
		width: 200rpx;
		float: left;
		height: 100%;
		background-color:  rgb(250, 244, 244);
	}
	.left_menu view{
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
	}
	.right_content{
		width: 518rpx;
		float: left;
		height: 100%;
		margin-left: 30rpx;
		background-color: rgb(250, 244, 244);
	}
	.index_swiper{
		width: 100%;
	}
	
	.index_swiper swiper,.index_swiper swiper swiper-item navigator image{
		width: 100%;
		height: 220rpx;
	}
	.goods_list{
		width: 100%;
		height: 150rpx;
		padding: 20rpx;
		margin-top: 20rpx;
		border: 1px solid rgb(239, 235, 243);
	}
	.goods_list navigator image{
		margin-top:30rpx;
		height: 100rpx;
		width: 120rpx;
		border-radius: 20rpx;
	}
	.goods_list navigator image,.goods_name,.goods_btn{
		float: left;
	}
	.goods_name{
		width: 200rpx;
		height: 150rpx;
		line-height: 150rpx;
		font-size: 30rpx;
		padding-left: 20rpx;
	}
	.goods_btn{
		width: 168rpx;
	}
	.goods_btn button{
		width: 138rpx;
		font-size: 25rpx;
		border-radius: 30rpx;
		margin-top: 35rpx;
		padding-right: 30rpx;
	}
</style>
