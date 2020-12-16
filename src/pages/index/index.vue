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
				<view class="menu_item {{index===currentIndex?'active':''}}" v-for="(item, index) in productList" :key="index" @click="handleItemTap(index)">
					{{item.categoryName}}
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
					<block v-for="(item, index) in swiperList" :key="index">
						<swiper-item>
							<navigator>
								<image mode="scaleToFill" src="{{apiUrl ? apiUrl+item.rotationImage: ''}}"></image>
							</navigator>
						</swiper-item>
					</block>
					</swiper>
				</view>
				<view class="goods_list" v-for="(item, index) in rightContent" :key="index">
					<navigator url="">
						<image mode="scaleToFill" src="{{apiUrl ? apiUrl+item.productIcon: ''}}"></image>
						<view class="goods_name">
							<text>{{item.productName}}</text>
							<text class="goods_decr">{{item.productDescription}}...</text>
							<text class="goods_price" style="color:red;">￥{{item.productPrice}}</text>
						</view>
						<view class="goods_btn"><button type="warn" @click="getpopStandard(item.productId,item.productName,item.productPrice,item.productDescription)">选规格</button></view>
					</navigator>
				</view>
			</scroll-view>
		</view>

		<!--点击选规格  底部弹出页面-->
		<view v-if="popStandard==true" class="select_product">
			<view class="product_header">{{productName}}</view>
			<view class="product_content">
			<view>
				<text>甜度</text>
				<button @click="bigSweet()" v-if="sweet==2" type="warn">多糖</button>
				<button @click="bigSweet()" v-if="sweet!=2">多糖</button>
				<button @click="mdSweet()" v-if="sweet==1" type="warn" class="pro_btn">正常糖</button>
				<button @click="mdSweet()" v-if="sweet!=1" class="pro_btn">正常糖</button>
				<button @click="smSweet()" v-if="sweet==0" type="warn" class="pro_btn">少糖</button>
				<button @click="smSweet()" v-if="sweet!=0" class="pro_btn">少糖</button>
			</view>
			<view>
				<text>冰量</text>
				<button @click="smIce()" v-if="ice==0" type="warn">少冰</button>
				<button @click="smIce()" v-if="ice!=0">少冰</button>
				<button @click="mdIce()" v-if="ice==1" type="warn" class="pro_btn">正常</button>
				<button @click="mdIce()" v-if="ice!=1" class="pro_btn">正常</button>
				<button @click="bigIce()" v-if="ice==2" type="warn" class="pro_btn">热的</button>
				<button @click="bigIce()" v-if="ice!=2" class="pro_btn">热的</button>
			</view>
			<view>
				<text>份量</text>
				<button @click="bigDeal()" v-if="deal==2" type="warn">大份</button>
				<button @click="bigDeal()" v-if="deal!=2">大份</button>
				<button @click="mdDeal()" v-if="deal==1" type="warn" class="pro_btn">中份</button>
				<button @click="mdDeal()" v-if="deal!=1" class="pro_btn">中份</button>
				<button @click="smDeal()" v-if="deal==0" type="warn" class="pro_btn">小份</button>
				<button @click="smDeal()" v-if="deal!=0" class="pro_btn">小份</button>
			</view>
			</view>
			<view class="product_footer">
				<text class="cpjs">产品介绍</text>
				<text class="introPro">{{productDescription}}</text>
			</view>
			<view class="footer_add_cart">
				<view class="add_car_view">
					<text class="car-view-price">￥{{productPrice}}</text>
					<uni-number-box :value="numberValue" @change="getNumber"></uni-number-box>
				</view>
				
				<view class="add_cart_btn">
					<button type="warn" @click="addCart()">加入购物车</button>
				</view>
			</view>
		</view>

		<!--购物车 页面-->
		<view v-if="showCar==true" class="car">
			<view class="car_left">
				<uni-icons @click="closeCart()" size="normal" type="closeempty"></uni-icons>
				<uni-icons size="normal" type="cart" @click="openCartDetail()"></uni-icons>
				<text>￥{{CarsPrice}}</text>
			</view>
			<view class="car_right">
				<button type="warn" @click="accountPrice">结算</button>
			</view>
		</view>

		<!--显示购物车数据 的弹出面-->
		<view class="showcar" v-if="showCarInfo==true">
			<view class="car-show" v-for="(item, index) in getCarsList" :key="index">
				<view class="showcar-group">
					<view class="showcar-item">
						<text>{{item.productName}}</text>
						<text class="item-price">￥{{item.productSumprice}}</text>
					</view>  
					<view class="showcar-deal" v-if="item.productSweetness==0">甜度：少糖</view>
					<view class="showcar-deal" v-if="item.productSweetness==1">甜度：正常糖</view>
					<view class="showcar-deal" v-if="item.productSweetness==2">甜度：多糖 </view>
					<view class="showcar-deal" v-if="item.productIce==0">冰量：少冰</view>
					<view class="showcar-deal" v-if="item.productIce==1">冰量：正常冰</view>
					<view class="showcar-deal" v-if="item.productIce==2">冰量：热的 </view>
					<view class="showcar-deal" v-if="item.productDeal==0">份量：小份</view>
					<view class="showcar-deal" v-if="item.productDeal==1">份量：中份</view>
					<view class="showcar-deal" v-if="item.productDeal==2">份量：大份 </view>
				</view>
				<view class="showcar-box">
					<!--<uni-number-box :value="value" @change="getCarNum"></uni-number-box>-->
					<text style="margin-left:90rpx;">{{item.productQuantity}}份</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	const util = require("@/utils/util.js")
	const api = require('@/utils/api.js');
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
				openid:'',
				swiperList:[],  //轮播图数组
				apiUrl:'http://10.64.65.84:8080',

				popStandard:false,   //是否显示规格选择页面
				sweet:1,   //甜度
				deal:1,    //份量
				ice:0,     //冰量
				numberPro:0,  //商品数量

				// 左侧的菜单数据
				productList: [],
				// 右侧的商品数据
				rightContent: [],
				// 被点击的左侧的菜单
				currentIndex: 0,
				// 右侧内容的滚动条距离顶部的距离
				scrollTop: 0,
				//是否显示购物车
				showCar:false,
				//是否显示购物车数据
				showCarInfo:false,
				//购物车
				car:[],
				
				//商品Id 商品名 商品价格 商品介绍
				productId:'',
				productName:'',
				productPrice:0,
				productDescription:'',
				//商品总金额
				producrSumPrice:0,
				//获取购物车数据
				getCarsList:[],
				//购物车的总金额
				CarsPrice:0,
				
			}
		},
		
		onLoad() {
			//获取两地之间的距离
			this.getUserLocation();
			//调用获取轮播图方法
			this.getSwiperList();

			this.getProdeuct();
			

			
			
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
			},

			//获取轮播图数据
			getSwiperList(){
				let _this=this;
				uni.request({
				url: api.localUrl+'rotationInfo/selectList',
						data: {
							
						},
						method: 'POST',
						header: {
							'content-type': 'application/json'
						},
						success: (res) => {
							_this.swiperList=res.data
							console.log(res)
						}
				});
			},
			//获取商品与分类类别
			getProdeuct(){
				let _this=this;
				uni.request({
				url: api.localUrl+'productInfo/getAllCategories',
						data: {
						},
						method: 'POST',
						header: {
							'content-type': 'application/json'
						},
						success: (res) => {
							// 构造左侧的大菜单数据
							_this.productList=res.data
							// 构造右侧的商品数据
							_this.rightContent=res.data[0].productInfoList
							_this.getStr()
							console.log(_this.productList)
							console.log(_this.rightContent)
						}
				});
			},
			//点击选规格按钮  弹出页面
			getpopStandard(productId,productName,productPrice,productDescription){
				let _this=this;
				_this.popStandard=true
				_this.productId=productId
				_this.productName=productName
				_this.productPrice=productPrice
				_this.productDescription=productDescription
				console.log()
			},

			//获取加入购物车商品数量
			getNumber(value){
				let _this=this
				_this.numberPro=value
				console.log(_this.numberPro)
			},

			//加入购物车  弹窗消失
			addCart(){
				let _this=this;
				_this.openid=uni.getStorageSync("openid");
				//计算商品总金额
				_this.producrSumPrice=_this.numberPro*_this.productPrice;
				console.log(_this.producrSumPrice)
				console.log(_this.openid)
				if(_this.openid==''){
					uni.showToast({
						title:'请先登录'
					});
				}else{
						if(_this.numberPro!=0){
						//添加数据到购物车
						_this.car.push({buyerOpenid:_this.openid,
								productId:_this.productId,
								productName:_this.productName,
								productQuantity:_this.numberPro,
								productSweetness:_this.sweet,
								productDeal:_this.deal,
								productIce:_this.ice,
								productSumprice:_this.producrSumPrice
								})
						uni.setStorageSync("cars",_this.car)
						_this.showCar=true
						uni.showToast({
							title:'已加入购物车'
						});

						this.getSumCarsPrice();
						}else{
							uni.showToast({
								title:'商品数量不能为0'
							})
						}
					
				}
				_this.popStandard=false;
				//恢复原始数据
				sweet:1;   //甜度
				deal:1;    //份量
				ice:0;     //冰量
				numberPro:0;  //商品数量

				//商品Id 商品名 商品价格 商品介绍
				productId:'';
				productName:'';
				productPrice:0;
				productDescription:'';
				//商品总金额
				producrSumPrice:0;
				_this.getCarsList=uni.getStorageSync("cars")
				console.log(_this.getCarsList)
			},
			//关闭购物车
			closeCart(){
				this.showCar=false
				this.showCarInfo=false
			},


			//对选择规格按钮事件处理
			//甜度
			bigSweet(){
				this.sweet=2
			},
			mdSweet(){
				this.sweet=1
			},
			smSweet(){
				this.sweet=0
			},
			//冰量
			smIce(){
				this.ice=0
			},
			mdIce(){
				this.ice=1
			},
			bigIce(){
				this.ice=2
			},
			//份量
			bigDeal(){
				this.deal=2
			},
			mdDeal(){
				this.deal=1
			},
			smDeal(){
				this.deal=0
			},

			 // 左侧菜单的点击事件
				handleItemTap(index) {
					let _this=this;
					/* 
					1 获取被点击的标题身上的索引
					2 给data中的currentIndex赋值就可以了
					3 根据不同的索引来渲染右侧的商品内容
					*/
					_this.rightContent = _this.productList[index].productInfoList;
					_this.currentIndex= index,
					_this.rightContent,
					_this.getStr(),
					// 重新设置 右侧内容的scroll-view标签的距离顶部的距离
					_this.scrollTop=0

				},

				//获取购物车数据
				// getCarsInfo(){
				// 	let _this=this;
				// 	_this.getCarsList=uni.getStorageSync("cars")
				// 	console.log("df"+_this.getCarsList) 
				// },
				//获取购物车中总金额
				getSumCarsPrice(){
					let _this=this;
					_this.getCarsList=uni.getStorageSync("cars");
					console.log("sd"+_this.getCarsList)
					// _this.getCarsList=Array.from(_this.getCarsList)
					_this.CarsPrice=0
					_this.getCarsList.forEach(v => {
						 _this.CarsPrice+=v.productSumprice
						 console.log(_this.CarsPrice)
					})
				},

				//打开购物车详情
				openCartDetail(){
					if(this.showCarInfo==false){
						this.showCarInfo=true
					}else{
						this.showCarInfo=false
					}
					
				},
				//结算
				accountPrice(){
					let _this=this;
					_this.showCar=false
					if(_this.CarsPrice!=0){
						uni.navigateTo({
							url:'/pages/pay/pay?CarsPrice='+_this.CarsPrice
						})
					}
				},

				getStr(){
					let _this=this
					_this.rightContent.forEach(v=>{
						v.productDescription=v.productDescription.substring(0,8)
					})
				}

				



			
				

	},
		components: {
			uniNoticeBar,
			uniIcons,
			uniSwiperDot,
			uniNumberBox,
			uniBadge
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
		height: 100%;
		width: 100%;
		margin-top: 20rpx;
	}

	.left_menu{
		width: 200rpx;
		float: left;
		height: 100%;
		background-color:  rgb(250, 244, 244);
	}
	.menu_item{
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
	}

	.left_menu .active{
		border-left: 2px solid rgb(207, 113, 35);
		background-color:white;
	}
	.right_content{
		width: 528rpx;
		float: left;
		height: 100%;
		margin-left: 20rpx;
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
		height: 250rpx;
		padding: 20rpx;
		margin-top: 20rpx;
		border: 1px solid rgb(239, 235, 243);
		
	}
	.goods_list navigator image{
		margin-top:30rpx;
		height:150rpx;
		width: 150rpx;
		border-radius: 20rpx;
	}
	.goods_list navigator image,.goods_name,.goods_btn{
		float: left;
	}
	.goods_name{
		width: 180rpx;
		font-size: 30rpx;
		padding-left: 20rpx;
		margin-top: 30rpx;
	}
	.goods_name text{
		width: 200rpx;
		float: left;
		height: 50rpx;
		line-height: 50rpx;
	}
	.goods_btn{
		width: 168rpx;
	}
	.goods_btn button{
		width: 138rpx;
		font-size: 25rpx;
		border-radius: 30rpx;
		margin-top: 70rpx;
		padding-right: 30rpx;
	}

	.goods_decr{
		font-size: 20rpx;
	}
	.good_price{
		color: red;
	}

	.select_product{
		width: 100%;
		padding-left: 30rpx;
		padding-right: 30rpx;
		position: fixed;
        left: 0rpx; bottom: 0rpx; right: 0rpx;
		background-color: white;
		border-bottom: 1px solid rgb(173, 172, 172);
	}

	.product_header{
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 30rpx;
	}
	.product_content{
		width: 100%;
		float: left;
		font-size: 35rpx;
	}
	.product_content view{
		width: 100%;
		height: 140rpx;
	}
	.product_content view text{
		height: 60rpx;
		line-height: 60rpx;
		width: 100%;
		float: left;
		font-size: 30rpx;
		font-weight: bold;
	}
	.product_content view button{
		width: 150rpx;
		height: 80rpx;
		float: left;
		font-size: 30rpx;
	}
	.pro_btn{
		margin-left: 30rpx;
	}

	.product_footer{
		height: 160rpx;
		width: 100%;
		float: left;
	}
	.cpjs{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		float: left;
	}
	.introPro{
		width: 100%;
		font-size: 25rpx;
		float: left;
	}

	.footer_add_cart{
		width: 100%;
		height: 310rpx;
		border-top: 1px solid rgb(192, 191, 192);
		float: left;
	}

	.add_car_view{
		height: 200rpx;
		line-height: 200rpx;
		width: 100%;
	}
	.add_car_view text{
		float: left;
	}
	.car-view-price{
		color: red;
	}
	.add_car_view uni-number-box{
		float: right;
		margin-top: 50rpx;
		margin-right: 30rpx;
	}
	.add_cart_btn button{
		margin-right: 45rpx;
		height: 100rpx;
	}

	.car{
		width: 100%;
		height: 150rpx;
		position: fixed;
        left: 0rpx; bottom: 0rpx; right: 0rpx;
		background-color: rgb(224, 218, 218);
	}
	
	.car_left{
		width: 300rpx;
		float: left;
		height: 150rpx;
		position:relative;
	}
	

	.car_left uni-icons{
		width: 200rpx;
	}
	.car_left text{
		font-size: 40rpx;
		color: red;
		height: 150rpx;
		width: 150rpx;
		line-height: 150rpx;
		margin-left: 30rpx;
		
	}

	.car_right{
		width: 400rpx;
		float: right;
	}
	.car_right button{
		width: 200rpx;
		height: 100rpx;
		font-size: 35rpx;
		margin-left:150rpx;
		margin-top:30rpx;
	}

	.showcar{
		width: 100%;
		padding-left: 50rpx;
		background-color: rgb(240, 239, 240);
		position: fixed;
        left: 0rpx; bottom: 150rpx; right: 0rpx;
	}

	.showcar-group{
		width: 450rpx;
		float: left;
	}

	.showcar-item{
		width: 400rpx;
		float: left;
		font-size: 30rpx;
	}

	.showcar-item text{
		height: 50rpx;
		line-height: 50rpx;
		width: 200rpx;
		float: left;
	}
	.item-price{
		color: red;
	}
	.showcar-deal{
		width: 130rpx;
		float: left;
		font-size: 20rpx;
		height: 50rpx;
		line-height: 50rpx;
		color: rgb(181, 181, 182);
	}
	.showcar-box{
		width: 270rpx;
		float: right;
		margin-right: 60rpx;
		margin-top: -70rpx;
	}
	.car-show{
		height: 120rpx;
		width:100%;
		padding-top: 20rpx;
		border-bottom: 1px solid rgb(151, 151, 151);
	}


</style>
