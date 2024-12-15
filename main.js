import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import App from './App'

// #ifndef VUE3
import Vue from 'vue'

// 导入store核心js
import store from 'store'
uni.$u.config.unit = 'rpx'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
//引入请求封装 将app参数传递到配置中
require('@/static/js/config/request.js')(app)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif