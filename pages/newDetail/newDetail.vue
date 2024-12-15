<template>
	<view>
		<view class="movie-bgimg " :style="{backgroundImage:'url(http://124.93.196.45:10091/'+newsDetail.cover+')'}">
		</view>

		<view class="movie-detail">
			<view class="detail-img">
				<image :src="'http://124.93.196.45:10091/'+newsDetail.cover" class="detail-img-ico"></image>
			</view>
			<view class="detail-info">
				<view class="detail-info-nm">
					{{newsDetail.title}}
				</view>

				<view class="detail-info-enm">
					发布时间:{{newsDetail.publishDate}}
				</view>
				<view class="detail-info-enm">
					点赞量:{{newsDetail.likeNum}}
				</view>
				<view class="detail-info-enm">
					浏览量:{{newsDetail.readNum}}
				</view>
				<view class="detail-info-enm">
					评论数:{{newsDetail.commentNum}}
				</view>
			</view>
		</view>
		<view class="hot-title-wapper">
			<image
				src="https://ts1.cn.mm.bing.net/th/id/R-C.c24f37ba4d7986b3e2207269bc27a28f?rik=Z5vyaZ4EkTU2Gw&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fwater%2f18190%2fgoods_water_18190_698_524.03_.png&ehk=ODH4SjCo9nPD7WH4P5s5KwN1Gh%2ft4MuR0wXO0dAkSl8%3d&risl=&pid=ImgRaw&r=0"
				class="hot-ico"></image>
			<view class="hot-title">
				新闻详情
			</view>
		</view>
		<view class="detail-info-int" v-html="newsDetail.content" style="margin-top: 20rpx;">
			<!-- {{newsDetail.content}} -->
		</view>
		<view>
		</view>
	</view>
</template>

<script>
	import {
		getnewsDetail
	}
	from '@/static/js/config/api.js'
	export default {
		data() {
			return {
				newsDetail: [],
			}
		},
		methods: {
		},
		onLoad(option) {
			console.log(option)
			let id = option.id
			getnewsDetail(id).then(res => {
				console.log("新闻详情")
				console.log(res)
				this.newsDetail = res.data
			}).catch(err => {
				console.log(err)
			})
		}
	}
</script>

<style scoped>
	.content {
			padding: 0 30rpx;
		}
	.movie-bgimg {
		width: 100%;
		height: 350upx;
		filter: blur(30upx);
		/* position: absolute; */
		background-repeat: no-repeat;
		background-size: 100% 100%;
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
		font-size: 20px;
	}

	.detail-info-enm {
		color: #FFFFFF;
		font-size: 15px;
		margin-top: 5rpx;
	}
	.hot-title-wapper {
		display: flex;
		flex-direction: row;
	}
	
	.hot-ico {
		width: 40upx;
		height: 40upx;
		margin-left: 10upx;
		margin-top: 50rpx;
	
	}
	
	.hot-title {
		font-size: 20px;
		margin-left: 30upx;
		margin-top: 40rpx;
		font-weight: bold;
	}
</style>
