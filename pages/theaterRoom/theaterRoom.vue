<template>
	<view class="page">
		<view class="cinema">
			<view class="left">
				<u-text lineHeight="50" size="40" bold="true" :text="theatreInfo.name"></u-text>
				<u-text lineHeight="50" size="25" :text="theatreInfo.address"></u-text>
			</view>
			<view class="right">
				<view>
					<u-icon name="map" color="#318eff" size="60"></u-icon>
					<p>地图</p>
				</view>
				<view>
					<u-icon name="bookmark" color="#ffc941" size="60"></u-icon>
					<p>收藏</p>
				</view>
			</view>
		</view>
		<!-- 影厅页面 -->
		<view class="movie">
			<view class="imgBc">
				<view class="movie-bgimg "
					:style="{backgroundImage:'url(http://124.93.196.45:10091'+movielist.cover+')'}">
				</view>
				<view class="bgimgdetil">
					<image :src="'http://124.93.196.45:10091'+movielist.cover" style="height: 100%;"></image>
				</view>
			</view>
			<view class="info">
				<view>
					<u-text lineHeight="50" size="40" bold="true" :text="movielist.name" align="center"></u-text>
					<u-text lineHeight="50" size="32" :text="movielist.language+'   时长：'+movielist.duration+'分钟'"
						align="center"></u-text>
				</view>
			</view>
		</view>
		<!-- 影厅 -->
		<view class="home">
			<view v-for="(item,index) in roomList" :key="index" @tap="buy(item.roomId,item.price,item)">
				<view class="halllist">
					<view style="margin-left: 15rpx;">
						<u-text lineHeight="50" size="40" bold="true" :text="item.startTime" align="left"></u-text>
						<u-text lineHeight="20" size="20" :text="item.endTime+' 散场'" align="left"></u-text>
					</view>
					<view>
						<u-text lineHeight="30" size="30" bold="true" text="国语2D" align="left"></u-text>
						<u-text lineHeight="20" size="20" :text="item.roomName" align="left"></u-text>
					</view>
					<view>
						<u-text lineHeight="20" size="40" :text="'￥'+item.price" align="left" color="red"></u-text>
					</view>
					<view style="margin-right: 15rpx;">
						<u-button shape="circle" customStyle="width:60rpx" :plain="true" size="mini" color="#eba820"
							text="特惠" @tap.stop="buy(item.roomId,item.price,item)"></u-button>
					</view>
				</view>
				<!-- 实线 -->
				<view class="bolider"></view>
			</view>
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
			return {}
		},
		methods: {
			...mapActions({
				setroomList: 'movie/setroomList',
				settheatreInfo: 'movie/settheatreInfo',
				// setmovieInfo: 'movie/setmovieInfo',
			}),
			// 选座
			buy(id, price, item) {
				console.log(id)
				uni.setStorageSync("cinemaHall", id)
				uni.navigateTo({
					url: `/pages/seat/seat?price=${price}`,
					success: (res) => {
						res.eventChannel.emit('info', {
							info: item
						})
					}
				})
			}
		},
		onLoad() {
			// 影院介绍
			this.settheatreInfo()
			// 影厅列表
			this.setroomList()
		},
		computed: {
			...mapState({
				theatreInfo: state => state.movie.theatreInfo,
				roomList: state => state.movie.roomList,
				movielist: state => state.movie.movieInfo,
			}),

		},
	}
</script>

<style scoped>
	.page {
		height: 100vh;
		background-color: #fff;
		overflow: scroll;
	}

	.cinema {
		height: 10%;
		position: relative;
		top: 0;
		display: flex;
		border-radius: 0 0 15rpx 0;
		box-shadow: 0px 2px 8px 0px rgba(85, 85, 85, 0.3);
		flex-wrap: nowrap;
	}

	.left {
		width: 70%;
		padding: 30rpx 0 0 10rpx;

	}

	.right {
		width: 30%;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-around;

	}

	.movie {
		margin-top: 50rpx;
		/* background-color: aqua; */
		height: 450rpx;
		box-shadow: 0px 2px 8px 0px rgba(85, 85, 85, 0.3);
		border-radius: 15rpx;
		margin-bottom: 50rpx;
	}

	.imgBc {
		height: 300rpx;
		/* background-color: aquamarine; */
		border: 30rpx 10rpx 10rpx 30rpx;
		box-shadow: inset 0px 2px 8px 2px #d5dee8;
		padding: 20rpx;
	}

	.movie-bgimg {
		width: 100%;
		height: 270rpx;
		filter: blur(30upx);
		position: absolute;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.bgimgdetil {
		height: 280rpx;
		width: 200rpx;
		position: relative;
		top: 0;
		left: 36%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.info {
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.halllist {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		height: 140rpx;
	}
</style>
