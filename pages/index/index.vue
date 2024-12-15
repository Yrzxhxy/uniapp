<template>
	<view class="content">
		<!-- 头部全局组件 -->
		<topHead></topHead>
		<view class="body">
			<!-- 轮播图 -->
			<view class="swiper">
				<swiper circular indicator-dots style="width: 100%;">
					<!-- v-for循环遍历轮播 -->
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image :src="'http://124.93.196.45:10091'+item.advImg" class="img"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 影片信息 -->
			<!-- 热映 -->
			<view class="page-block super-hot">
				<view class="hot-title-wapper">
					<image src="../../static/image/hotview.jpg"
						class="hot-ico"></image>
					<view class="hot-title">
						正在热映
					</view>
				</view>
				<!-- 实线 -->
				<view class="bolider"></view>
				<scroll-view scroll-x="true" class="hot page-block">
					<view class="signle-poster" v-for=" (item,index) in hotview" :key="index" @tap="buy(item.id)">
						<view class="poster-wapper">
							<image :src="'http://124.93.196.45:10091/'+item.cover" class="hot-movie-jpg"></image>
							<view class="movie-name" style="text-align: center;">
								{{item.name}}
							</view>
							<view style="width: 20rpx;margin-left: 50rpx;">
							<u-button type="error" size="mini" text="购买" @tap.stop="buy(item.id)"></u-button>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 待映 -->
			<view class="page-block super-notice">
				<view class="hot-title-wapper">
					<image src="../../static/image/notice-view.png"
						class="hot-ico"></image>
					<view class="hot-title">
						待映
					</view>
				</view>
				<!-- 实线 -->
				<view class="bolider"></view>
				<scroll-view scroll-x="true" class="hot page-block">
					<view class="signle-poster" v-for=" (item,index) in noticeview" :key="index" @tap="detail(item.id)">
						<view class="poster-wapper">
							<image :src="'http://124.93.196.45:10091/'+item.cover" class="hot-movie-jpg"></image>
							<view class="movie-name" style="text-align: center;">
								{{item.name}}
							</view>
							<view style="width: 20rpx;margin-left: 50rpx;">
							<u-button type="primary" size="mini" text="了解" @tap.stop="detail(item.id)"></u-button>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		getswiper,
		getHotview,
		getNoticeview
	} from '../../static/js/config/api.js'
	export default {
		data() {
			return {
				// 轮播图
				swiperList: [],
				// tab分页
				navIndex: 0,
				// 热映
				hotview: [],
				// 待映
				noticeview:[]

			}
		},
		onLoad() {
			// 轮播广告
			getswiper().then((res) => {
				console.log(res)
				if (res.code == 200) {
					this.swiperList = res.rows

				}
			}).catch((err) => {
				console.log(err)
			})
			// 热映列表
			getHotview().then((res) => {
				console.log(res)
				if (res.code == 200) {
					this.hotview = res.rows

				}
			}).catch()
			//待映列表
			getNoticeview().then((res)=>{
				console.log(res)
				if(res.code==200){
					this.noticeview=res.rows
					
				}
			}).catch()
		},
		methods: {
			// tab分页
			checkIndex(index) {
				console.log(index)
				this.navIndex = index;
			},
			// 热映
			buy(item) {
				console.log(item)
				this.$store.dispatch("movie/setId", item)
				uni.setStorageSync('movieId', item);
				// 选择影院
				uni.navigateTo({
					url: '/pages/movieDetail/movieDetail'
				})
			},
			// 待映
			detail(item){
				console.log(item)
				this.$store.dispatch("movie/setId", item)
				uni.navigateTo({
					url: '/pages/teaserDetails/teaserDetails'
				})
			}

		}
	}
</script>

<style>
	.content {
		width: 100%;
		min-height: 100vh;
		overflow: scroll;
		background-color: #e7e7e7;
		height: 100%;
	}

	.body {
		position: relative;
		z-index: 1;
	}

	.swiper {
		margin-top: 300rpx;
		height: 200rpx;
		height: 260rpx;
	}

	.img {
		width: 100%;
		height: 100%;

	}


	/* 热映 */

	.super-hot {
		position: absolute;
		left: 2.5%;
		width: 90%;
		margin-top: 60rpx;
		padding: 20upx;
		 background-color: rgb(247, 247, 247);
		border-radius: 15rpx;
		 box-shadow: 0px 2px 8px 0px rgba(85, 85, 85, 0.3);
	}
	.super-notice{
		position: absolute;
		left: 2.5%;
		width: 90%;
		margin-top: 600rpx;
		padding: 20upx;
		 background-color: rgb(247, 247, 247);
		border-radius: 15rpx;
		 box-shadow: 0px 2px 8px 0px rgba(85, 85, 85, 0.3);
	}
	.hot-title-wapper {
		display: flex;
		flex-direction: row;
	}

	.hot-ico {
		width: 40upx;
		height: 40upx;
		margin-top: 5upx;

	}

	.hot-title {
		font-size: 20px;
		margin-left: 20upx;
		font-weight: bold;
	}

	.hot {
		margin-top: 10rpx;
		width: 100%;
		white-space: nowrap;
	}

	.signle-poster {
		display: inline-block;
		margin-left: 20upx;
	}

	.poster-wapper {
		display: flex;
		flex-direction: column;
	}

	.hot-movie-jpg {
		width: 200upx;
		height: 270upx;
	}

	.movie-name {
		width: 200upx;
		margin-top: 10upx;
		font-size: 14px;
		font-weight: bold;
		/* 对名字过长进行处理 */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.bolider {
		background: #3a3a3a;
		width: 98%;
		height: 4rpx;
		margin: 0 auto;
	}	
</style>
