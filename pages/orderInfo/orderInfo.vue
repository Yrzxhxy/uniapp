<template>
	<view class="orderinfo">
		<view class="head">
			<p>等待您的付款</p>
		</view>
		<view class="body">
			<view class="bodyinfo">
				<view class="img">
					<image style="width: 80%; height: 90%;border-radius: 15rpx;" :src="'http://124.93.196.45:10091'+info.movieCover"></image>
				</view>
				<view class="textInfo">
					<u-text  lineHeight="50" size="50"  :text="info.movieName" bold="true" ></u-text>
					<u-text  lineHeight="40" size="30"  :text="info.createTime" bold="true" ></u-text>
					<view style="margin-top: 30rpx;">
					<u-text  lineHeight="40" size="30"  :text="info.theatreName" bold="true" ></u-text>
					<u-text  lineHeight="40" size="30"  :text="orderInfo.orderItems.length+'张    原价'+orderInfo.orderItems[0].price" bold="true" ></u-text>
					</view>
				</view>
			</view>
			<view class="bolider"></view>
			<view class="">
				
			</view>
			
		</view>
		<view class="body" style="height: 660rpx;">
			<u-text  lineHeight="30" size="30"  text="尊敬的观众，感谢您选择我们的影院观看电影。" bold="true" ></u-text>
			<u-text  lineHeight="30" size="26"  text="为了确保您的观影体验顺畅，请遵循以下购票及观影指南：" bold="true" ></u-text>
			<view class="bolider"></view>
			<p style="font-size:28rpx;">
			1. 提前到达影院		</br>
			请您至少提前30分钟到达影院现场，以便有足够的时间完成取票等准备工作。</br>
			2. 自助取票流程	</br>
			到达影院后，请使用我们的自助取票机进行取票。操作简单快捷，助您轻松获取电影票。</br>
			3. 取票问题咨询	</br>
			如果在取票过程中遇到任何问题，如无法取票等，请及时联系我们的影院工作人员，我们将竭诚为您服务。</br>
			4. 检票入场		</br>
			请注意电影的开场时间，并在开场前凭票有序地进行检票入场，以免错过精彩内容。</br>
			5. 发票开具服务	</br>
			若您需要开具电影票发票，请在观影当日凭票根向影院工作人员咨询办理流程。</br>
			</p>
			
			
		</view>
			<view class="buy">
				<view style="margin-left: 30rpx; ">
					共计：
				<u-text  lineHeight="50" size="50"  :text="'¥'+orderInfo.price" bold="true" color="red"></u-text>
				</view>
				<view style="width: 300rpx;margin-right: 20rpx;">
				<u-button customStyle="width:100%" type="error" shape="circle" text="确认支付" @click="buy(orderInfo.id)"></u-button>
				</view>
			</view>
	</view>
</template>

<script>
	import{mapState,mapActions} from 'vuex'
	import {pay} from '@/static/js/config/api.js'
	export default {
		data() {
			return {
				info:{},
				
			}
		},
		methods: {
			...mapActions({
				getorderInfo: 'user/getorderInfo',
				
			}),
			buy(id){
				uni.showLoading({
					icon: 'success',
					title: '正在支付'
				});
				setTimeout(function() {
					
				pay(id).then(
					res=>{
						console.log(res)
						if(res.code==200){
							uni.showToast({
								icon: 'success',
								title: '支付成功'
							});
							
						}
					}
				).catch()
				// 在这里写要执行的代码
				uni.hideLoading();
				setTimeout(function() {
				uni.navigateBack({
				  delta: 1 // 回退前数个页面，如果 delta 大于现有页面数，则返回到首页
				});
				}, 1000);
				}, 1500);
				
				
			}
		},
		computed:{
			...mapState({
				orderInfo: state => state.user.orderInfo,
			}),
		},
		onLoad(options) {
			let paramsString=decodeURIComponent(options.params)
			// console.log(paramsString)
			let params=JSON.parse(paramsString)
			console.log(params)
			this.info=params
			
			this.getorderInfo()
		}
	}
</script>

<style scoped>
	.orderinfo{
		height: 100vh;
		overflow: scroll;
		background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
	}
	.head{
		margin-top: 20rpx;
		width: 60%;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 20%;
		background-color: #fff;
		border-radius: 50rpx;
		box-shadow: 0px 2px 8px 0px rgba(85, 85, 85, 0.3);
	}
	.body{
		width: 90%;
		margin-left: 3%;
		padding: 20rpx;
		height: 300rpx;
		margin-top: 50rpx;
		box-shadow: 0px 2px 8px 0px rgba(85, 85, 85, 0.3);
		border-radius: 20rpx;
		background-color: #fff;
	}
	.bolider {
		background: #b0b0b0;
		width: 98%;
		height: 2rpx;
		margin: 0 auto;
	}	
	.bodyinfo{
		height: 280rpx;
		display: flex;
	}
	.img{
		
		width: 35%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.textInfo{

		width: 65%;
		padding: 30rpx;
	}
	/* 付款 */
	.buy {
		background-color: #FFFFFF;
		position: fixed;
		width: 100%;
		left: 10%;
		z-index: 99;
		height: 200rpx;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		left: 0;
		border-radius: 15rpx;
		box-shadow: 0px 2px 8px 0px rgba(85, 85, 85, 0.3);
	}
</style>
