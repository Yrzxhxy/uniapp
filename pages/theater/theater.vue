<template>
	<view class="page">
		<view class="head">
			<image :src="movieInfo.cover" style="width: 90rpx; height: 120rpx;margin: 10rpx;"></image>
			<view style="margin-top: 10px;">
				<u-text :text="movieInfo.name" lineHeight="50" size="40" bold="true"></u-text>
				<u-text :text="'猫眼评分：'+movieInfo.score" lineHeight="50" size="28" bold="true" color="orange"></u-text>
				<u-rate :count="count" v-model="movieInfo.score" disabled inactive-color="orange" size="30rpx"></u-rate>
			</view>
		</view>
		<view class="body">
				<view v-for="(item,index) in theatre" :key="index" class="list" @tap="toRoom(item.theaterId)">
					<u-row customStyle="margin:14rpx 0 0 12rpx;" >
						<u-col span="8">
							<u-row>
								<u-text lineHeight="50" size="32" :text="item.theatreName" bold="true"></u-text>
							</u-row>
							<u-row>
								<u-text lineHeight="50" size="28" :text="'开场时间：'+item.startTime" bold="true"></u-text>
							</u-row>
							<u-row>
								<u-text lineHeight="50" size="25" :text="'散场时间'+item.endTime" bold="true"></u-text>
								<u-text lineHeight="50" size="25" :text="'已售：'+item.saleNum+'张'" bold="true"></u-text>
							</u-row>
						</u-col>
					</u-row>
					<u-row justify="right" customStyle="padding-bottom:8rpx;border-bottom:1px solid #efefef">
						<u-col offset="8" span="3">
							-------
							<!-- <u-button shape="square" customStyle="width:60rpx" size="mini" color="#eb1625" type="error"
								text="自提/配送" @click="shop(item.branch_shop_id)"></u-button> -->
						</u-col>
					</u-row>
					<!-- 实线 -->
					<view class="bolider"></view>
				</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,mapState
	} from 'vuex'
	export default {
		data() {
			return {
				// 电影信息
				movieInfo: {},
				count:5,
				
			}
		},
		methods: {
			...mapActions({
				settheatre: 'movie/settheatre'
			}),
			// 前往影厅页面
			toRoom(theatreId){
				console.log("xxx"+theatreId)
				uni.setStorageSync("roomId",theatreId)
				uni.navigateTo({
					url:'/pages/theaterRoom/theaterRoom'
				})
			}
		},
		onLoad(option) {
			console.log(option)
			this.movieInfo = option
			this.settheatre()
			
		},
		computed:{
			...mapState({
				theatre: state => state.movie.theatreList 
			
			}),
		}
	}
</script>

<style scoped>
	.page {
		height: 100vh;
		background-color: #fcfcfc;
		overflow: scroll;
	}

	.head {
		display: flex;
		flex-wrap: nowrap;
		border-radius: 15rpx;
		background-color: #d31f00;
		box-shadow: 0px 2px 8px 0px rgba(85, 85, 85, 0.3);
		position: fixed;
		z-index: 99;
		width: 100%;
	}
	.body{
		width: 100%;
		margin-top: 160rpx;
		
	}
	.list{
		margin-top: 10rpx;
		background-color: #fff;
		padding: 3rpx ;
	}
</style>
