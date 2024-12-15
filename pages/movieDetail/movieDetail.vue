<template>
	<view class="page">
		<view class="head">
			<!-- 头部图片和信息 -->
			<view class="movie-bgimg " :style="{backgroundImage:'url(http://124.93.196.45:10091'+list.cover+')'}">
			</view>
			<view class="movie-detail">
				<view class="detail-img">
					<image :src="'http://124.93.196.45:10091'+list.cover" class="detail-img-ico"
						style="width: 300rpx; height: 300rpx;"></image>
				</view>
				<view class="detail-info">
					<view class="detail-info-nm">
						{{list.name}}
					</view>
					<view class="detail-info-enm">
						{{list.playDate}}
					</view>
					<view class="detail-info-dur">
						{{list.language}}/{{list.duration}}分钟
					</view>
				</view>
			</view>
		</view>
		<view :class="fold == true?'movie-info-texthide page-block':'movie-info-textauto page-block'">
			<rich-text :nodes="list.introduction"></rich-text>
		</view>
		<view class="movie-info-text-btn page-block" @click="changeText">
			<image :src="fold==true?'../../static/image/down.png':'../../static/image/top.png'"
				class="movie-info-text-btn-img"></image>
		</view>
		<view class="buy">
			<u-button customStyle="width:80%" type="error" shape="circle" text="特惠购票" @click="buy"></u-button>
		</view>
	</view>
	</view>
</template>
<script>
	import {mapState,mapActions} from 'vuex'
	export default {
		data() {
			return {
				fold: true, //隐藏文本
			}
		},
		methods: {
			...mapActions({
				setmovieInfo: 'movie/setmovieInfo',
			}),
			changeText() {
				this.fold = !this.fold;
			},
			// 点击跳转到影院
			buy() {
				// 没登录
				if (!uni.getStorageSync("token")) {
					uni.showToast({
						title: '用户未登录，请您先登录',
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.hideLoading()
							}, 500)
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/login/login'
								});
							}, 700)
						}
					})
				} else {
					// 已登录
					uni.navigateTo({
						url: `/pages/theater/theater?name=${this.list.name}&cover=${'http://124.93.196.45:10091'+this.list.cover}&score=${this.list.score}`
					});
				}
			}

		},
		onLoad() {
			this.setmovieInfo()
		},
		computed: {
			...mapState({
				list: state => state.movie.movieInfo,
			}),
		
		},
	}
</script>

<style>
	.page {
		height: 100vh;
		background-color: #defcf9;
		overflow: scroll;
	}

	.head {

		height: 405rpx;
	}

	.movie-bgimg {
		width: 100%;
		height: 350rpx;
		filter: blur(30upx);
		position: absolute;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	/* 上部分详情 Begin */
	.movie-bgimg {
		width: 100%;
		height: 350upx;
		filter: blur(30upx);
		/* position: absolute; */
		background-repeat: no-repeat;
		/* background-size: 100% 100%; */
	}

	.movie-detail {
		display: flex;
		flex-direction: row;
		padding: 30upx 30upx;
		position: absolute;
		top: 0;
	}

	.detail-img-ico {
		width: 206upx;
		height: 286upx;
	}

	.detail-info {
		color: #C0C0C0;
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		font-size: 14px;
		line-height: 22px;
	}

	.detail-info-nm {
		color: #FFFFFF;
		font-size: 18px;
	}

	/* 上部分详情 End */
	/* 详细 */
	.movie-info-texthide {
		height: 50upx;
		padding: 50upx 30upx;
		margin-top: 30upx;
		overflow: hidden;
	}

	.movie-info-textauto {
		padding: 50upx 30upx;
		margin-top: 30upx;
		height: auto;
	}

	.movie-info-text-btn {
		text-align: center;
	}

	.movie-info-text-btn-img {
		width: 30upx;
		height: 30upx;
	}

	/* 购票 */
	.buy {
		background-color: #FFFFFF;
		position: fixed;
		width: 100%;
		left: 10%;
		z-index: 99;
		height: 200rpx;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		border-radius: 15rpx;
		box-shadow: 0px 2px 8px 0px rgba(85, 85, 85, 0.3);
	}
</style>
