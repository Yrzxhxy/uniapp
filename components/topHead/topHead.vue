<template>
	<view class="tophead">
		<!-- 全局公用组件 -->
		<view class="header">
			猫眼购票
		</view>
		<view class="search">
			<u-search placeholder="请输入您要搜索的影片" v-model="keyword" shape="round" height="70"></u-search>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: ''
			};
		}
	}
</script>

<style>
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

	.search {
		position: absolute;
		top: 200rpx;
		left: 0;
		width: 100%;
		height: 100rpx;

	}
</style>
