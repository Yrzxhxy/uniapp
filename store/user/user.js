import {
	getInfo,getOrderInfo
} from '../../static/js/config/api.js'
// vuex的深度封装
export default{
	namespaced:true,
	state:{
		// 个人信息
		userInfo:[],
		// 订单信息
		orderInfo:{},
	},
	mutations:{
		//个人信息
		['SET_USERINFO'](state, payload) {
			state.userInfo = payload.val.user
		},
		// 订单信息
		['SET_ORDERINFO'](state, payload) {
			state.orderInfo = payload.val.data
		}
	},
	actions:{
		// 个人信息
		getUserInfo(context, payload) {
			getInfo(payload).then(
				res => {
					console.log(res)
					context.commit("SET_USERINFO", {
						val: res
					})
				}
			).catch()
		},
		// 订单信息
		getorderInfo(context, payload) {
			let id=uni.getStorageSync("orderId")
			getOrderInfo(id,payload).then(
				res => {
					console.log(res)
					context.commit("SET_ORDERINFO", {
						val: res
					})
				}
			).catch()
		},
	},
	getters:{
		
	}
}