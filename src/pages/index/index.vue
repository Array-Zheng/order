<template>
	<view class="content">
		<uni-notice-bar :showGetMore="true" v-if="noticeText" showClose="true" showIcon="true" :text="noticeText"></uni-notice-bar>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	const util = require("@/utils/util.js")
	export default {
		data() {
			return {
				noticeText:"新店开张，欢迎各位光临！",   //通知信息
				//我的所在位置的纬度和经度
				latitude:null,
				longitude:null,
				distance:null  //与门店的距离
			}
		},
		onLoad() {
			this.getDistance(); 
		},
		methods: {
			//获取当地位置
			getDistance:function(){
				util.getLocation().then(function(res) {
					that.latitude=res.latitude;
					that.longitude=res.longitude;
				});
			}
		},
		components: {uniNoticeBar}
	}
</script>

<style>
	

</style>
