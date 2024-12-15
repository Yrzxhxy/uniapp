<template>
	<view class="page">
			<view class="tabs">
				<u-tabs lineColor="#f56c6c" :list="list" @click="click" lineWidth="50rpx"></u-tabs>
				<!-- 导航栏 -->
			</view>
		<view class="body">
			<view class="" v-show="TabCur==0">
				<view class="unDone" v-for="(item,index) in rows" :key="index" v-if="item.status==='N'">
					<view class="infoHead">
						<u-text  lineHeight="50" size="30"  :text="item.theatreName" ></u-text>
						<u-text  lineHeight="50" size="30"  text="未完成" align="right"></u-text>
					</view>
					<!-- 实线 -->
					<view class="bolider"></view>
					<view class="infoBody">
						<image :src="'http://124.93.196.45:10091'+item.movieCover" style="width: 130rpx; height: 170rpx;margin-left: 10rpx;" ></image>
						<view class="" style="height: 160rpx; padding: 30rpx; ">
							<u-text  lineHeight="50" size="30"  :text="item.movieName" bold="true" ></u-text>
							<view style="margin-top: 30rpx;">
							<u-text  lineHeight="50" size="30"  :text="item.createTime" ></u-text>
							<u-text  lineHeight="40" size="30"  :text="item.roomName"></u-text>
							</view>
						</view>
						<view class="" style="width: 130rpx;margin-left: 80rpx;">
							<u-button type="error" text="去支付" shape="circle" size="small" @tap="buy(item.id,item)"></u-button>
						</view>
					</view>
					<!-- 实线 -->
					<view class="bolider"></view>
					<view class="infoFoot">
						<u-text  lineHeight="50" size="30"  :text="'总价：'+item.price+'元'"></u-text>
						<view class="" style="width: 150rpx;">
							<u-button type="info" text="取消订单" shape="circle" size="small" :hairline="true" plain @tap="deleteOr(item.id)"></u-button>
						</view>
					</view>
				</view>
			</view>
			<view class="" v-show="TabCur==1">
				<view class="unDone" v-for="(item,index) in rows" :key="index" v-if="item.status==='Y'">
					<view class="infoHead">
						<u-text  lineHeight="50" size="30"  :text="item.theatreName" ></u-text>
						<u-text  lineHeight="50" size="30"  text="已完成" align="right"></u-text>
					</view>
					<!-- 实线 -->
					<view class="bolider"></view>
					<view class="infoBody">
					<image :src="'http://124.93.196.45:10091'+item.movieCover" style="width: 130rpx; height: 170rpx;margin-left: 10rpx;" ></image>
						<view class="" style="height: 160rpx; padding: 30rpx; ">
							<u-text  lineHeight="50" size="30"  :text="item.movieName" bold="true" ></u-text>
							<view style="margin-top: 30rpx;">
							<u-text  lineHeight="50" size="30"  :text="item.createTime" ></u-text>
							<u-text  lineHeight="40" size="30"  :text="item.roomName"></u-text>
							</view>
						</view>
						<view class="" style="width: 130rpx;margin-left: 80rpx;">
							<u-button type="error" text="查看详细" shape="circle" size="small" ></u-button>
						</view>
					</view>
					<!-- 实线 -->
					<view class="bolider"></view>
					<view class="infoFoot">
						<u-text  lineHeight="50" size="30"  :text="'总价：'+item.price+'元'"></u-text>
						<view class="" style="width: 150rpx;">
							<u-button type="info" text="删除订单" shape="circle" size="small" :hairline="true" plain @click="deleteOr(item.id)"></u-button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getorderlist,deleOrder,getHotviewInfo} from '@/static/js/config/api.js'
	export default {
		data() {
			return {
				list: [{
					name: '未完成',
				}, {
					name: '已完成',
				}],
				rows:[],
				TabCur:0,
				
			}
		},
		methods: {
		
			buy(id,item) {
				uni.setStorageSync("orderId",id)
				let params=JSON.stringify(item)
					uni.navigateTo({
						url:`/pages/orderInfo/orderInfo?params=${encodeURIComponent(params)}`
					})
			},
			deleteOr(id){
				uni.showModal({
				title: '提示',
				content: '确定删除？',
				cancelText: "取消", // 取消按钮的文字
				confirmText: "确认", // 确认按钮的文字
				showCancel: true, // 是否显示取消按钮，默认为 true
				confirmColor: '#f55850',
				cancelColor: '#39B54A',
				success: (res) => {
				if(res.confirm) {
				console.log('comfirm') //点击确定之后执行的代码
				deleOrder(id).then(
				res=>{
					console.log(res)
					if(res.code==200){
						uni.showLoading({
							icon: 'success',
							title: '已删除'
						});
						this.getLIst()
						setTimeout(function() {
						// 在这里写要执行的代码
						uni.hideLoading();
						}, 500);
					

					}
				}).catch()
				} else {
				console.log('cancel') //点击取消之后执行的代码
				}
				}
				})
				
			},
			click(item) {
				// console.log('item', item);
				this.TabCur=item.index
			},
		async getLIst() {
		  try {
		    const res = await getorderlist();
		    console.log(res);
		    this.rows = res.rows;
		    // 使用Promise.all来并行处理所有电影信息的获取
		    const promises = this.rows.map(row => {
		      return getHotviewInfo(row.movieId).then(res => {
		        let movieCover = res.data.cover;
		        let customvalue = { movieCover: movieCover };
		        return { ...row, ...customvalue };
		      }).catch(error => {
		        console.error('Error fetching movie info:', error);
		        return row; // 返回原始行，或者根据需要进行错误处理
		      });
		    });
		    // 等待所有Promise解决
		    this.rows = await Promise.all(promises);
		    console.log(this.rows);
		  } catch (error) {
		    console.error('Error fetching order list:', error);
		  }
		},
			tabSelect(e) {
				console.log(e)
				this.TabCur = e.currentTarget.dataset.id;
			
			}
		},
	
		onShow(){
			this.getLIst()
		},
		
	}
</script>

<style scoped>
	.page {
		height: 100vh;
		overflow: scroll;
		/* background-color: aqua; */
	}

	.tabs {
		width: 100%;
		display: flex;
		justify-content: space-around;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 99;
		background-color: aliceblue;

	}
	.body{
		
		height: 100%;
		margin-top: 110rpx;
		/* padding-top: 10rpx; */
		/* position: relative; */
		background-image: url('');
		
	}
	.unDone{
		height: 330rpx;
		width: 100%;
		background-color: #fff;
		border-radius: 15rpx;
		box-shadow: 0px 2px 8px 0px rgba(85, 85, 85, 0.3);
		/* position: absolute; */
		margin-top: 30rpx;
	}
	.infoHead{
		display: flex;
		width: 95%;
		padding-top: 10rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;
	}
	.infoBody{
		/* background-color: black; */
		height: 190rpx;
		display: flex;
		align-items: center;
	}
	.bolider {
		background: #b0b0b0;
		width: 98%;
		height: 2rpx;
		margin: 0 auto;
	}	
	.infoFoot{
		display: flex;
		/* margin-top: 10rpx; */
		padding: 10rpx;
	}
</style>
