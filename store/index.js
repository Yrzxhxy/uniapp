// vuex
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user'
import movie from './movie/movie'
import news from './news/new'

Vue.use(Vuex)
export default new Vuex.Store({
	// 模块化管理
	modules:{
		// 引入user的vuex封装
		user,movie,news
	},
	//公共变量区
	state: {
		
	
	
	},
	getters:{
			
		},
	mutations: {
		
		
		
	},
	//公共方法

	
	
})
