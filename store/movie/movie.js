// vuex的深度封装
import {
	gettheatre,getTimesList,gettheatreInfo,getHotviewInfo,getRoomInfo
} from '../../static/js/config/api.js'
export default{
	namespaced:true,
	state:{
			// 影片id
			movieId:'',	
			// 影片详情
			movieInfo:{},
			// 查询影院信息列表
			theatreList:[],
			// 获取影院信息详细信息
			theatreInfo:{},
			// 查询影片场次列表(替换之前的查询全部影厅)
			roomList:[],
			// 获取影厅信息详细信息
			roomInfo:{}
	},	
	mutations:{
		//设置id
		SET_MOVIEID(state,movieid){
			state.movieId=movieid
		},
		// 影片详情
		['SET_MOVIEINFO'](state, payload) {
			state.movieInfo = payload.val.data
		},
		// 查询影院信息列表
		['SET_THEATRE'](state, payload) {
			state.theatreList = payload.val.rows
		},
		// 查询影院内影厅信息列表
		['SET_ROOM'](state, payload) {
			state.roomList = payload.val.rows
		},
		['SET_THEATREINFO'](state, payload) {
			state.theatreInfo = payload.val.data
		},
		// 获取影厅信息详细信息
		['SET_ROOMINFO'](state, payload) {
			state.roomInfo = payload.val.data
		},
	},
		actions:{
			// 影片id
			setId({commit},movid){
				commit('SET_MOVIEID',movid)
				console.log("vuex当前影片id:"+movid)
			},
			// 影片详情
			setmovieInfo(context, payload){
				let id = uni.getStorageSync("movieId")
				getHotviewInfo(id,payload).then(
					res=>{
						console.log(res)
						context.commit("SET_MOVIEINFO", {
							val: res
						})
					}
				).catch()
			},
			// 查询影院信息列表
			settheatre(context, payload){
			
				gettheatre(payload).then(
					res => {
						console.log(res)
						context.commit("SET_THEATRE", {
							val: res
						})
					}
				).catch()
			},
			// 查询影院内影厅信息列表
			setroomList(context, payload){
				getTimesList(payload).then(
				res=>{
					console.log(res)
					context.commit("SET_ROOM", {
						val: res
					})
				}).catch()
			},
			 // 获取影院信息详细信息
			settheatreInfo(context, payload){
				let id=uni.getStorageSync("roomId")
				gettheatreInfo(id,payload).then(
				res=>{
					console.log(res)
					context.commit("SET_THEATREINFO", {
						val: res
					})
				}).catch()
			},
				// 获取影厅信息详细信息
				setroomInfo(context, payload){
					let roomId=uni.getStorageSync("cinemaHall")
					getRoomInfo(roomId,payload).then(
					res=>{
						console.log(res)
						context.commit("SET_ROOMINFO", {
							val: res
						})
					}).catch()
				},
	},
	getters:{
		
	}
}