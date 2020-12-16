<template>
	<view class="content">
		<view class="showcar">
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
        <view class="goodsNav">
            <uni-goods-nav :buttonGroup="buttonGroup"  @buttonClick="removeCart()"></uni-goods-nav>
        </view>
        
	</view>
	
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		data() {
			return {
                buttonGroup: [{
                    text: '清空购物车',
                    backgroundColor: '#ff0000',
                    color: '#fff'
                    },
                    {
                    text: '结算',
                    backgroundColor: '#ffa200',
                    color: '#fff'
                    }
                    ],
				getCarsList:[]
			}
		},
		onLoad() {
           this.getCarsList=uni.getStorageSync("cars")
		},
		methods: {
            removeCart(){
                uni.showModal({
                title: '清空购物车',
                content: '确定清空购物车',
                success: function (res) {
                    if (res.confirm) {
                       uniwx.removeStorageSync('cars')
                       uni.showToast({
                           title:'清空成功'
                       })
                    } else if (res.cancel) {
                        
                    }
                }
            });
            }
        },
        components: {  
        	uniGoodsNav
    	} 
		
	}
</script>

<style>
	.showcar{
		width: 100%;
		padding-left: 50rpx;
		background-color: rgb(240, 239, 240);
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

    .goodsNav{
        position: fixed;
        left: 0rpx; bottom: 40rpx; right: 0rpx;
    }
</style>