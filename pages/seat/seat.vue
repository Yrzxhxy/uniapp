<template>
	<view class="page">
		<anil-seat ref="anilSeatRef" :title="movielist.name" info="2021年01月22日 国语 奇幻 喜剧 儿童" :room-name="roomInfo.name"
			@confirm="handleConfirm">
		</anil-seat>
	</view>
</template>

<script>
	import anilSeat from '@/uni_modules/anil-seat/components/anil-seat/anil-seat.vue'
	import {
		getSeat,
		PostTicket,
		getTobuy
	} from '../../static/js/config/api.js'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		components: {
			anilSeat
		},
		data() {
			return {
				// 目标数组
				seatArray: [],
				info: {},
				// 提交订单明细
				orderInfo: [],
				price: 0,
				timesId: 0
			};
		},
		methods: {
			...mapActions({
				setroomInfo: 'movie/setroomInfo',
			}),
			// 提交订单
			handleConfirm(selectedSeats) {
				console.log(selectedSeats)
				const arrTest = selectedSeats
				for (let j = 0; j < arrTest.length; j++) {
					const test = arrTest[j]
					this.orderInfo.push({
						price: test.Price * 1,
						seatCol: test.ColumnNum,
						seatRow: test.RowNum,
						seatId: test.SeatCode,

					})
				}
				let params = {
					endTime: this.info.info.endTime,
					movieId: uni.getStorageSync("movieId"),
					playDate: this.info.info.playDate,
					orderItems: this.orderInfo,
					theaterId: this.info.info.theaterId,
					startTime: this.info.info.startTime,
					roomId: this.info.info.roomId,
					price: this.price * this.orderInfo.length,
					timesId: this.timesId
				}
				console.log(params)
				uni.showLoading({
					icon: 'none',
					title: '正在为您锁座'
				});
				PostTicket(params).then(
					res => {
						console.log(res)
						if (res.code == 200) {
							uni.hideLoading();
							uni.showModal({
								// title: '提示',
								content: '订单已生成，请到个人中心页结算',
								success: function() {
									//回到首页
									uni.switchTab({
										url: '/pages/index/index'
									});

								}
							})
						}
					}
				).catch()
			}

		},
		onLoad(option) {
			// 查询座位信息列表
			this.page = this.getOpenerEventChannel();
			this.page.on('info', (data) => {
				this.info = data
				console.log(this.info)
				// 这是data 就是上个页面传递的对象了
			})
			console.log(option)
			this.price = option.price
			// API
			getSeat().then(
				res => {
					console.log(res)
					//  // 获取文件系统管理器
					//         const fs = uni.getFileSystemManager();
					
					//         // 创建临时文件路径
					//         const tempFilePath = `${uni.env.USER_DATA_PATH}/temp.txt`; // 可以根据需要自定义文件名和路径
					// 		const data=JSON.stringify(res)
					//         // 写入文件
					//         fs.writeFile({
					//             filePath: tempFilePath,
					//             data: data,
					//             encoding: 'utf8',
					//             success: function () {
					//                 console.log('文件写入成功，临时文件路径为：', tempFilePath);
					//                 // 这里可以继续处理临时文件，例如上传到服务器等
					//             },
					//             fail: function (err) {
					//                 console.error('文件写入失败：', err);
					//             }
					//         });
					// uni.saveFile({
					// 	tempFilePath: tempFilePath, // 这里需要一个临时文件路径，如果res.data已经是文件路径则直接使用
					// 	success: function(saveRes) {
					// 		// 保存成功，saveRes.savedFilePath 是文件的本地路径
					// 		console.log('文件保存成功，路径为：', saveRes.savedFilePath);
					// 	},
					// 	fail: function(err) {
					// 		// 保存失败
					// 		console.error('文件保存失败：', err);
					// 	}
					// })
					if (res.code == 200) {
						const arr = res.rows
						for (let i = 0; i < arr.length; i++) {
							const demo = arr[i]
							this.seatArray.push({
								YCoord: demo.row,
								XCoord: demo.col,
								SeatCode: demo.id,
								Status: demo.status,
								RowNum: demo.row,
								ColumnNum: demo.col,
								Price: option.price
							}, )
						}
						console.log(this.seatArray)
						this.$refs['anilSeatRef'].initData(this.seatArray)
					}
				}
			).catch()
			// 查询影片场次列表
			getTobuy().then(
				res => {
					console.log(res)
					console.log(res.rows[0].id)
					this.timesId = res.rows[0].id
				}
			).catch()
			this.setroomInfo()

		},
		computed: {
			...mapState({
				movielist: state => state.movie.movieInfo,
				roomInfo: state => state.movie.roomInfo,

			}),

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eee;
		height: 100%;
		overflow: scroll;
	}
</style>