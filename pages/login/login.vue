<template>
	<view class="login">
		<view class="content-wrapper">
			<view class="title">
				
				账号密码登录
			</view>
			<view class="login-form">
				<view class="login-form-items">
					<view class="login-form-items-title">用户名</view>
					<input v-model="username" type="text" class="login-input" placeholder="用户名" />
				</view>
				<view class="login-form-items">
					<view class="login-form-items-title">登录密码</view>
					<input v-model="password" type="password" class="login-input" placeholder="请输入登录密码" />
				</view>
				<view class="login-form-items">
					<view class="login-form-items-title">验证码</view>
					<input v-model="code" type="text" class="login-input" placeholder="请输入验证码" />
					<view class="captcha-wrapper" @click="updateImageCode">
						<canvas style="width:220rpx;height:86rpx;" canvas-id="canvas"></canvas>
					</view>
				</view>  
			</view>
		</view>
		<view class="submit-wrapper">
			<u-button @click="login" text="登录" color="linear-gradient(to right, rgb(216, 31, 71), rgb(213, 93, 131))">
			</u-button>
		</view>
		<view class="reg">
			<text @click="reg">没有账号？立即注册</text>
		</view>
		<view class="agreement">
			<text>《登录即代表您同意用户协议》</text>
		</view>
	</view>
</template>

<script>
	import {
		Mcaptcha
	} from '../../utils/mcaptcha.js'
	import {
		postLogin
	} from '../../static/js/config/api.js'
	export default {
		data() {
			return {
				username: '',
				password: '',
				code: ''
			}
		},
		methods: {
			// 登录
			login() {
				if (!this.code) {
					return uni.showToast({
						title: '请输入图形验证码',
						icon: 'none',
					})
				}
				let validate = this.mcaptcha.validate(this.code)
				if (!validate) {
					return uni.showToast({
						icon: 'error',
						title: '图形验证码错误'
					})
				}
				// 提交登录表单
				postLogin({
					username: this.username,
					password: this.password
				}).then((res) => {
					console.log(res)
					// 将token存入storage
					if (res.code == 200) {
						uni.setStorageSync("token", res.token)
						uni.showToast({
							icon: 'success',
							title: '登录成功'
						})
						uni.navigateBack({
							delta: 1
						});
					}

				})

			},
			// 刷新验证码
			updateImageCode() {
				this.mcaptcha.refresh()
			},
			// 注册
			reg() {
				console.log("注册")
			}
		},

		onReady() {
			// 初始化页面调用验证码
			this.mcaptcha = new Mcaptcha({
				el: 'canvas',
				width: 80,
				height: 35,
				createCodeImg: ""
			});
		},

	}
</script>

<style lang="scss">
	page {
		background: #F4F5F6;
		position: relative;
	}

	.title {

		height: 100rpx;
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

	.login {
		position: absolute;
		top: 300rpx;

		.content-wrapper {
			width: 100%;



			.login-form {
				margin: 20px 10px 20px 15px;
				background: #FFFFFF;

				.login-form-items {
					padding: 15px 10px;
					border-bottom: 1px solid #F3F4F5;
					position: relative;
					display: -webkit-flex;
					display: flex;

					.login-form-items-title {
						width: 30%;
						line-height: 22px;
						height: 22px;
						flex-shrink: 0;
					}

					.login-input {
						width: 100%
					}

					img {
						width: auto;
						height: auto;
						max-width: 100%;
						max-height: 100%;
					}
				}
			}
		}

		.submit-wrapper {
			padding: 10px;
			padding-top: 10px;
		}

	}

	.agreement {
		margin-top: 80rpx;
		text-align: center;
		color: #0076F6;
	}

	.reg {
		margin-top: 5rpx;
		position: absolute;
		right: 40rpx;
		font-size: small;
		color: #0076F6;
	}
</style>
