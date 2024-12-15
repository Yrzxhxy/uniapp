<template>
	<view>
		<view class="tophead">
			<!-- 全局公用组件 -->
			<view class="header">
				猫眼购票
			</view>
		</view>
			<view class="hot-title-wapper">
				<image
					src="https://pic.52112.com/180426/180426_172/KOdTnRhbRj_small.jpg"
					class="hot-ico"></image>
				<view class="hot-title">
					每日新闻
				</view>
			</view>
			<view class="content">
				<view v-for=" (item1,index) in press" :key="index" @tap="news(item1.id)">
					<u-row>
						<u-col span="3" customStyle="margin:70rpx 20rpx 20rpx 20rpx">
							<image :src="'http://124.93.196.45:10091/'+item1.cover" style="width: 110rpx; height: 110rpx; border-radius: 15rpx;"></image>
						</u-col>
						<!-- 三行 -->
						<u-col span="8">
							<u-row>
								<u-col>
									<u--text :text="item1.title" size='20' bold='ture' lineHeight='30'
										customStyle="margin:25rpx"></u--text>
								</u-col>
							</u-row>
							<u-row>
								<u-col>
									<p class="press_p">发布时间:{{item1.publishDate}}</p>
									<p class="press_p">点赞数:{{item1.likeNum}}</p>
									<p class="press_p">浏览数:{{item1.readNum}}</p>
								</u-col>
							</u-row>
						</u-col>
					</u-row>
					<u-row justify="end" customStyle="border-bottom:3px solid #dddddd;">
					</u-row>
				</view>
			</view>
		</view>
</template>

<script>
		import {
			getpress
		}
		from '@/static/js/config/api.js'
		export default {
			data() {
				return {
					press:[]
				}
			},
			methods: {
				news(id){
					// this.$store.dispatch("getpress", id);
					// console.log(this.$store.dispatch("getpress", id))
					uni.navigateTo({
						url:`/pages/newDetail/newDetail?id=${id}`
					})
				}
			},
			onLoad() {
				// 调用新闻网络请求
				getpress().then(res => {
					console.log("getpress")
					this.press = res.rows
					console.log(this.press)
				}).catch(err => {
					console.log(err)
				})
			}
		}
</script>

<style scoped>
	.hot-title-wapper {
			display: flex;
			flex-direction: row;
			margin-top: 200rpx;
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
		.content {
			width: 100%;
		}
		.press_p{
			font-size: 15px;
			font-family: "黑体";
			margin: 10rpx 0rpx 0rpx 40rpx;
		}
		.tophead {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			z-index: 99;
		}
		
		.header {
			position: absolute;
			width: 100%;
			height: 200rpx;
			background-color: #d31f00;
			color: aliceblue;
			display: flex;
			align-items: center;
			justify-content: center;
			left: 0;
			font-family: "微软雅黑";
			font-weight: bold;
			font-size: larger;
		}
		
</style>