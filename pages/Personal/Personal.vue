<template>
	<view class="wrapper">
		<!-- 个人资料 -->
		<view>
			<view class="top">
				<view class="center">

					<view class="center_top">
						<view class="center_img">
							<!-- 这里可以放自己的静态头像 -->
							<image src="../../static/image/dd.jpg" style="height: 90rpx; width: 90rpx;"></image>
						</view>
						<view class="center_info">
							<view class="center_name">
								{{userInfo.userName}}
							</view>
							<view class="center_vip">
								<uni-icons type="vip" size="14"></uni-icons>
								<view class="vip_text">
									<text>普通会员</text>
								</view>
							</view>
							<!-- 其他个人中心内容 -->
						</view>

					</view>
				</view>

			</view>
		</view>
		<!-- 统计 -->
		<view class="count">
			<view class="cell"> 8 <text style="color: #AAAAAA;">收藏影视</text> </view>
			<view class="cell"> 14 <text style="color: #AAAAAA;">历史记录</text> </view>
			<view class="cell"> 18 <text style="color: #AAAAAA;">关注信息</text> </view>
			<view class="cell"> 84 <text style="color: #AAAAAA;">我的足迹</text> </view>
		</view>
		<!-- 其它 -->
		<view class="extra">
			<view class="order">
				<u-text lineHeight="40" size="30" bold="true" text="我的订单" align="left"></u-text>
				<u-divider ></u-divider>
				<view style="display: flex; text-align: center;justify-content: space-around;margin-top: 30rpx;">
					<view class="cell2" @click="toOrder"> <u-icon name="order"  size="70"></u-icon> <text style="color: #AAAAAA;">电影票</text> </view>
					<view class="cell2"> <u-icon name="star"  size="70"></u-icon> <text style="color: #AAAAAA;">演出/玩乐</text> </view>
					<view class="cell2"> <u-icon name="eye"  size="70"></u-icon> <text style="color: #AAAAAA;">在线观影</text> </view>
					<view class="cell2"><u-icon name="bag"  size="70"></u-icon><text style="color: #AAAAAA;">周边</text> </view>
				</view>
			</view>
		</view>
		<view class="btn">
			<u-button type="error" shape="circle" text="退出登录" @tap="outLogin"></u-button>
		</view>
	</view>

</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		onShow() {
			// 页面加载时执行
			// 可以在这里实现前置守卫逻辑
			if (!uni.getStorageSync("token")) {
				// 如果用户未登录，跳转到登录页面
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			...mapActions({
				getUserInfo: 'user/getUserInfo'
			}),
			toOrder(){
				uni.navigateTo({
					url:'/pages/orders/orders'
				})
			},
			// 退出登录
			outLogin() {
				uni.removeStorageSync('token')
				uni.showToast({
					title: '退出成功',
					success() {
						setTimeout(() => {
							uni.hideLoading()
						}, 500)
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/index/index'
							});
						}, 1000)
					}
				})
			},

		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo //菜品搜索数据

			}),
		}
	}
</script>

<style scoped lang="scss">
	.extra {
		display: flex;
		justify-content: center;
	}

	.cell2 {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.order {
		width: 90%;
		background-color: #5555ff;
		height: 200rpx;
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: rgb(247, 247, 247);
		border-radius: 15rpx;
		box-shadow: 0px 2px 8px 0px rgba(85, 85, 85, 0.3);
	}

	.btn {
		position: absolute;
		bottom: 0;
		width: 80%;
		left: 10%;
	}

	.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #F4F4F4;
		overflow: scroll;
	}

	.top {
		width: 100%;
		height: 200rpx;
		background: #ff301d;
		padding-top: 30rpx;
		position: relative;
	}

	.center {
		width: 95%;
		height: 160rpx;
		background: #fdffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		margin: 0 auto;
		border-radius: 5rpx;
	}

	.center_top {
		display: flex;
		min-width: 350rpx;
		flex-direction: row;
		background: #ffaa7f;
		height: 120rpx;
		margin-top: 0rpx;
		border-bottom: 1rpx solid #5555ff;
	}

	.center_img {
		margin: 13rpx 0 0 12rpx;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.center_info {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}

	.center_name {
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
	}

	.vip_text {
		font-size: 25rpx;
		margin-top: -33rpx;
		margin-left: 40rpx;
		color: #676767;
	}

	.count {
		display: flex;
		margin: 0 20rpx;
		height: 120rpx;
		text-align: center;
		border-radius: 4rpx;
		background-color: #fff;

		position: relative;
		top: 10rpx;

		.cell {
			margin-top: 10rpx;
			flex: 1;
			padding-top: 20rpx;
			font-size: 27rpx;
			color: #333;
		}

		text {
			display: block;
			font-size: 24rpx;
		}
	}
</style>
