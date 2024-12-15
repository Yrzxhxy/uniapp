import {
	getNews
} from '../../static/js/config/api.js'
// vuex的深度封装
export default {
	namespaced: true,
	state: {
		newList: []
	},
	mutations: {
		['SET_NEWS'](state, payload) {
			state.newList = payload.val
		}

	},
	actions: {
		getNewList(context, payload) {
			getNews(payload).then(
				res => {
					console.log(res)
					context.commit("SET_NEWS", {
						val: res
					})
				}
			).catch()
		}
	},
	getters: {

	}
}
