<template>
	<view class="container">
        <view class="content-header">
            <view v-if="avatarUrl" @click="loginOut()">
                <image mode="widthFix" :src="avatarUrl"></image>
                <text>{{nickName}}</text>
            </view>
           <view v-else>
                <button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @click="login()">
                    立即登录
                </button>
           </view>
        </view>
		<view class="content-center">
            <uni-list>
                <uni-list-item thumb="/static/images/qiandao.png" @click="toDate()" :clickable="true" :showArrow="true"  title="每日签到" ></uni-list-item>
                <uni-list-item thumb="/static/images/shouchang.png" @click="toCart()" :clickable="true" :showArrow="true" title="我的购物" ></uni-list-item>
                <uni-list-item thumb="/static/images/youhui.png" :showArrow="true"  title="优惠买单" ></uni-list-item>
                <uni-list-item thumb="/static/images/dingdan.png" @click="toOrder()" :clickable="true" :showArrow="true" title="全部订单" ></uni-list-item>
                <uni-list-item thumb="/static/images/address.png" @click="toAddress()" :clickable="true" :showArrow="true"  title="收货地址" ></uni-list-item>
                <uni-list-item thumb="/static/images/kefu.png" :showArrow="true"  title="联系商家" ></uni-list-item>
                <uni-list-item thumb="/static/images/women.png" :showArrow="true" title="关于我们" ></uni-list-item>
            </uni-list>
        </view>
	</view>
</template>

<script>
import uniList from '../../components/uni-list/uni-list.vue'
const api = require('@/utils/api.js');
    //导入列表组件
	export default {
  components: { uniList },
		data() {
			return {
				SessionKey: '',
                OpenId: '',
                nickName: '',
                avatarUrl: '',
                isCanUse: uni.getStorageSync('isCanUse')||true//默认为true
               
			}
		},
		onLoad() {
            
		},
		methods: {
            // decryptUserInfo(e){
            //     const {userInfo}=e.detail;
            //     uni.setStorageSync("userinfo", userInfo);
            //     console.log(userInfo);
            //     uni.navigateBack({
            //         delta: 0
            //      });
            // }
            //第一授权获取用户信息===》按钮触发
            

            // wxGetUserInfo() {
            //     let _this = this;
            //     uni.login({
            //         success: function(res)  {
            //              uni.getUserInfo({
            //         provider: 'weixin',
            //         success: function(infoRes) {
            //             console.log(infoRes);
            //             let nickName = infoRes.userInfo.nickName; //昵称
            //             let avatarUrl = infoRes.userInfo.avatarUrl; //头像
            //             try {
            //                 uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
            //                 _this.updateUserInfo();
            //             } catch (e) {}
            //         },
            //         fail(res) {}
            //     });
            //         },fail(res){

            //         }
            //     })
               
            // },

            // wxGetUserInfo() {
            //     let _this = this;
            //     uni.showModal({
            //         title: '申请获取以下权限',
            //         content: '获得你的公开信息(昵称，头像、地区等)',
            //         success: function (res) {
            //             if (res.confirm) {
            //                 console.log('用户点击确定');
            //                 uni.getUserInfo({
            //                 provider: 'weixin',
            //                 success: function(infoRes) {
            //                     console.log(infoRes);
            //                     _this.nickName = infoRes.userInfo.nickName; //昵称
            //                     _this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
            //                     try {
            //                         uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
            //                         _this.updateUserInfo();
            //                     } catch (e) {}
            //                 },
            //                 fail(res) {}
            //             });
            //             } else if (res.cancel) {
            //                 console.log('用户点击取消');
            //             }
            //         }
            //     });
            // }
            // 1.wx获取登录用户code
            login(){
                let _this = this;
                let  code='';
                
                uni.showModal({
                    title: '申请获取以下权限',
                    content: '获得你的公开信息(昵称，头像、地区等)',
                    success: function (res) {
                        if (res.confirm) {
                            uni.showLoading({
                                title: '登录中...'
                            });
                            console.log('用户点击确定');
                            uni.login({
                                provider: 'weixin',
                                success: function(loginRes) {
                                     _this.code = loginRes.code;
                                    console.log(_this.code)
                                    if (_this.isCanUse) {
                                        //非第一次授权获取用户信息
                                        uni.getUserInfo({
                                            provider: 'weixin',
                                            success: function(infoRes) {
            　　　　　　　　　　　　　　　　　　　　//获取用户信息后向调用信息更新方法
                                                console.log(infoRes);
                                                _this.nickName = infoRes.userInfo.nickName; //昵称
                                                _this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
                                            }
                                        });
                                    }
                        
                                    //2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
                                    uni.request({
                                        url: api.localUrl+'user/login',
                                        data: {
                                            code: _this.code, 
                                        },
                                        method: 'GET',
                                        header: {
                                            'content-type': 'application/json'
                                        },
                                        success: (res) => {
                                            //openId、或SessionKdy存储
                                            _this.OpenId=res.openid
                                            console.log(res.data.openid);
                                            uni.setStorageSync("openid",res.data.openid);
                                           
                                           
                                            console.log(res)
                                            //隐藏loading
                                            uni.hideLoading();
                                        }
                                    });
                                },
                            });

                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },

            toAddress(){
                let _this=this;
                console.log(_this.OpenId)
                if(_this.OpenId==''){
                   uni.showToast({
						title: '请先登录',
						duration: 2000
					});
                }else{
                    uni.navigateTo({
					    url:"/pages/address/showAddress/showAddress"
				})
                }
               
            },
            toOrder(){
                let _this=this;
                console.log(_this.OpenId)
                if(_this.OpenId==''){
                   uni.showToast({
						title: '请先登录',
						duration: 2000
					});
                }else{
                    uni.navigateTo({
					    url:"/pages/order/orderList/orderList"
				})
                }
            },
            toDate(){
                let _this=this;
                console.log(_this.OpenId)
                if(_this.OpenId==''){
                   uni.showToast({
						title: '请先登录',
						duration: 2000
					});
                }else{
                    uni.navigateTo({
					    url:"/pages/date/date"
				})
                }
            },
            toCart(){
                let _this=this;
                console.log(_this.OpenId)
                if(_this.OpenId==''){
                   uni.showToast({
						title: '请先登录',
						duration: 2000
					});
                }else{
                    uni.navigateTo({
					    url:"/pages/cart/cart"
				})
                }
            },

            //退出登录
            loginOut(){
                let _this=this
                uni.showModal({
                    title: '退出提示',
                    content: '确定退出登录',
                    success: function (res) {
                        if (res.confirm) {
                            _this.nickName= '';
                            _this.avatarUrl= '';
                            try {
                                uni.removeStorageSync('openid');
                            } catch (e) {
                                // error
                            }
                        } else if (res.cancel) {
                           
                        }
                    }
                });
            }


        }
       
	}
</script>

<style>
    
	.content-header{
        width: 100%;
        height: 250rpx;
    }

    .bottom {
        border-radius: 80rpx;
        margin: 70rpx auto;
        font-size: 35rpx;
        width: 200rpx;
    }
    .content-header view image{
        width:120rpx;
        border-radius: 100%;
        height: 130rpx;
        margin-top: 10rpx;
        margin-left: 314rpx;
        float: left;
    }
    .content-header view text{
        float: left;
        width: 100%;
        text-align: center;
    }
    
</style>
